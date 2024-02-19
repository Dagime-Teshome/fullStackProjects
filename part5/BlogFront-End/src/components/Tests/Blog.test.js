import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";

// eslint-disable-next-line no-undef

// Describe("<Blog Form>")

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "Go To Statement Considered Harmful",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…",
    author: "Edsger W. Dijkstra",
    likes: 5,
  };
  const handleUpdate = jest.fn();
  beforeEach(() => {
    container = render(<Blog blog={blog} onupdate={handleUpdate} />).container;
  });

  test("check component renders only the blog's title & author initially", () => {
    const div = container.querySelector(".showDetail");
    expect(div).toHaveStyle("display:none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("More");
    await user.click(button);

    const div = container.querySelector(".showDetail");
    expect(div).not.toHaveStyle("display: none");
  });

  test("handler is clicked twice when like button is clicked twice", async () => {
    const likeButton = screen.getByText("like");
    const user = userEvent.setup();
    await user.click(likeButton);
    await user.click(likeButton);
    expect(handleUpdate.mock.calls).toHaveLength(2);
  });
});
