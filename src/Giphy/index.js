import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import cx from "classnames";
import s from "./giphy.module.scss";
import Toggle from "../Component/Toggle";

// api.giphy.com/v1/gifs/trending
// api_key: K0do6URDQKwkjgQ6NA0l7euVMW8gzX6l
// Lr4bRq7gz39ETO7rWgmWOaTdPXVIshau - 2

function Giphy(params) {
  const [listGifs, setListGifs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);
  const [offset, setOffset] = useState(1);

  const themeContainerColor = cx(s.container, {
    [s.containerDark]: toggleTheme,
  });

  // initial call to setListGifs
  useEffect(() => {
    getAllGifs();
  }, []);

  // get All Gifs
  const getAllGifs = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "Lr4bRq7gz39ETO7rWgmWOaTdPXVIshau",
          limit: 50,
          offset: offset,
        },
      })
      .then(function (response) {
        if (response?.data?.meta?.status === 200) {
          //   console.log("response.data.data: ", response.data.data);
          //   setListGifs(response.data.data);
          setListGifs((prevGifs) => [...prevGifs, ...response.data.data]);
          setOffset((prevOffset) => prevOffset + 50);
          setIsLoading(false);
          updateListView();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // fetch All Gifs that match the search criteria.
  const getSearchGifs = (searchText) => {
    axios
      .get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "K0do6URDQKwkjgQ6NA0l7euVMW8gzX6l",
          q: searchText,
          limit: 20,
        },
      })
      .then(function (response) {
        // console.log(response);
        if (response?.data?.meta?.status === 200) {
          setListGifs(response.data.data);
          setIsLoading(false);
          updateListView();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const updateListView = () => {
    console.log("listGifs: ", listGifs);
    return _.isEmpty(listGifs) || isLoading
      ? "Loading Gifs..."
      : listGifs.map((gif) => (
          <>
            <img
              src={gif.images.preview_gif.url}
              height={"150px"}
              width={"150px"}
              alt={gif.slug}
            />
          </>
        ));
  };

  return (
    <>
      <div className={themeContainerColor}>
        <div className={s.toggleContainer}>
          <Toggle onChangeHandler={setToggleTheme} toggleValue={toggleTheme} />
        </div>
        <div className={s.searchContainer}>
          <input
            type="text"
            onChange={(e) => {
              let value = e.target.value;
              console.log(value);
              setSearchText(value);
            }}
            value={searchText}
          />
          <button
            onClick={() => {
              getSearchGifs(searchText);
              setIsLoading(true);
            }}
          >
            Search
          </button>
        </div>
        <div className={s.listView}>{updateListView()}</div>
      </div>
    </>
  );
}

export default Giphy;

// ### 🧿**APIs:**

// Giphy has extensive documentation and you can get all the required APIs from there.
// Create a free beta API key for your project and you should be good to go!

// 🌟 ***Here are the features of this product:***

// 💻 **Basic GIF Display:** **

// Create a simple app to display Trending GIFs with Optimized Grid(ie in an optimized grid layout) from a given API.

// 🔎**Simple Search Functionality:**

// Include a search feature for filtering GIFs by keywords. You can use Giphy search endpoint for this.

// 📜**Infinite Scroll**

// The store should have an infinite scroll, where the GIFs will keep loading as and when the user Scrolls.

// 🔄**Basic Theme Toggle:** **

// Implement a theme toggle between light and dark modes.
