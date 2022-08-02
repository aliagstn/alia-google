import "@testing-library/jest-dom"
import {fireEvent, render, screen} from '@testing-library/react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeSearch from "./HomeSearch"
import userEvent from '@testing-library/user-event'
test("to change the input search", async () => {
    render(<BrowserRouter><Routes><Route path="/" element={<HomeSearch />} /></Routes></BrowserRouter>)
    const input = await screen.findByLabelText("search")
    fireEvent.change(input, {target:{value:'operasi'}})
    expect(input).toHaveValue("operasi")
})
test("to submit the input search", async () => {
    render(<BrowserRouter><Routes><Route path="/" element={<HomeSearch />} /></Routes></BrowserRouter>)
    const submit = await screen.findByLabelText("submit")
    userEvent.click(submit)
    expect(submit).toHaveValue("operasi")
})