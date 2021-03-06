import React from "react";
import logo from "./logo.svg";
import Downshift from "downshift";
import "./App.css";
import { myBooks } from "./bookData";

function App() {
  return (
    <Downshift
      onChange={(bookSelected) =>
        alert(
          bookSelected
            ? `You Selected ${bookSelected.title} here is some info. Authors: ${bookSelected.authors}`
            : "No Results"
        )
      }
      itemToString={(item) => (item ? item.title : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <React.Fragment>
          <div>
            <label {...getLabelProps()}>Search A Book: </label>
            <div style={{ display: "inline-block" }} {...getRootProps()}>
              <input {...getInputProps()} />
            </div>
            <ul {...getMenuProps()}>
              {isOpen
                ? myBooks
                    .filter(
                      (book) =>
                        !inputValue ||
                        book.title
                          .toString()
                          .match(new RegExp(".*" + inputValue + ".*", "i"))
                    )
                    // .slice(0, 10)
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.ratings_count,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? "gray" : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                            width: "50%",
                            cursor: "pointer",
                          },
                        })}
                      >
                        {item.title}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        </React.Fragment>
      )}
    </Downshift>
  );
}

export default App;
