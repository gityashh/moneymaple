import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";

const tags = [
    { value: "Housing", label: "Housing" },
    { value: "Transportation", label: "Transportation" },
    { value: "Food", label: "Food" },
    { value: "Health Care", label: "Health Care" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Debt", label: "Debt" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Lend", label: "Lend" },
    { value: "Miscellaneous", label: "Miscellaneous" },
];

function ExpenseUpdateForm({ expense, handleExpenseUpdate }) {
    const [name, setName] = useState(expense.name || "");
    const [price, setPrice] = useState(expense.price || "");
    const [description, setDescription] = useState(expense.description || "");
    const [selectedOption, setSelectedOption] = useState(
        tags.find((tag) => tag.value === expense.tag) || null
    );
    const [selectedDate, setSelectedDate] = useState(
        expense.date ? new Date(expense.date) : null
    );

    const { token, url } = useAuthentication();

    useEffect(() => {
        setName(expense.name || "");
        setPrice(expense.price || "");
        setDescription(expense.description || "");
        setSelectedOption(
            tags.find((tag) => tag.value === expense.tag) || null
        );
        setSelectedDate(expense.date ? new Date(expense.date) : null);
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/update_expense",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                id: expense.id,
                expense_name: name,
                price: price,
                tag: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                if (res.data.error) {
                    toast(res.data.error);
                } else {
                    handleExpenseUpdate({
                        id: expense.id,
                        expense_name: name,
                        price: price,
                        tag: selectedOption.value,
                        date: selectedDate.toISOString().slice(0, 10),
                        description: description,
                    });
                }
            })
            .catch((err) => {
                toast("Error Adding Expense");
            });
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '',
            backgroundColor: 'transaparent',
            borderColor: '#52525b',
            padding: '.1rem',
            borderRadius: '0.125rem',
            fontWeight: '300',
            marginBottom: '1rem'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#a1a1aa',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#e4e4e7',
        }),
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="expense-form dashboard-second-container dashboard-border-radius">
            <ToastContainer />
            <form className="expense-add-form pl-20" onSubmit={handleSubmit}>
                <div className="expense-form-field">
                    <input
                     className=" bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="text"
                        placeholder="Expense Name"
                        name="expenseName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <input
                    className=" bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <Select
                    styles={customStyles}
                        value={selectedOption}
                        onChange={handleChange}
                        options={tags}
                        placeholder="Select a tag"
                        className="select-tag"
                    />
                </div>

                <div className="">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="bg-zinc-900 border-[.1px] py-6 rounded-sm text-zinc-400 font-light w-full pr-2"
                    />
                </div>

                <div className=" flex">
                    <textarea
                     className="bg-zinc-800 py-6 rounded-sm text-zinc-400 border-none font-light w-full"
                        placeholder="Description of the payment"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                     className="add-expense-button expense-form-field w-[20.5vw] h-12 text-center bg-[#78E89E] py-2 rounded-sm text-black text-xl font-light mt-2 ease-linear"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExpenseUpdateForm;
