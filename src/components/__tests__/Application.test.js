import React from "react";

import { fireEvent } from "@testing-library/react";

import { render, cleanup, waitForElement, prettyDOM, getAllByTestId, getByAltText, getByText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    console.log(prettyDOM(appointment));
  });

  it("Find the specific day node that contains the text Monday", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday" && "no spots remaining")

    );

    console.log(prettyDOM(day));
  });
});