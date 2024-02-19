import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BlogForm from "../BlogForm";

describe("<BlogForm />", () => {
  let expected = {
    title: "god damn 47!!!",
    author: "Sir Me",
    url: "http://whatisgoingon.com",
  };
  test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const Blogcreate = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm createBlog={Blogcreate} />);
    const titleInput = container.querySelector("#title");
    const authorInput = container.querySelector("#author");
    const urlInput = container.querySelector("#url");
    const sendButton = screen.getByText("Create");

    await user.type(titleInput, "god damn 47!!!");
    await user.type(authorInput, "Sir Me");
    await user.type(urlInput, "http://whatisgoingon.com");
    await user.click(sendButton);
    expect(Blogcreate.mock.calls).toHaveLength(1);
    expect(Blogcreate.mock.calls[0][0]).toMatchObject(expected);
  });
});
