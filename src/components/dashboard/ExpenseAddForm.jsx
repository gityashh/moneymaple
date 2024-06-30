import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function ExpenseAddForm({
    handleForm,
    monthly,
    setMonthly,
    yearly,
    setYearly,
    housing,
    setHousing,
    transportation,
    setTransportation,
    food,
    setFood,
    healthCare,
    setHealthCare,
    personalCare,
    setPersonalCare,
    personalCareComparison,
    debt,
    setDebt,
    entertainment,
    setEntertainment,
    lend,
    setLend,
    miscellaneous,
    setMiscellaneous,
}) {
    function tagBasedDataUpdate() {
        if (selectedOption.label === "Housing") {
            setHousing(parseInt(housing) + parseInt(price));
        }
        if (selectedOption.label === "Transportation") {
            setTransportation(parseInt(transportation) + parseInt(price));
        }
        if (selectedOption.label === "Food") {
            setFood(parseInt(food) + parseInt(price));
        }
        if (selectedOption.label === "Health Care") {
            setHealthCare(parseInt(healthCare) + parseInt(price));
        }
        if (selectedOption.label === "Personal Care") {
            setPersonalCare(parseInt(transportation) + parseInt(price));
        }
        if (selectedOption.label === "Debt") {
            setDebt(parseInt(debt) + parseInt(price));
        }
        if (selectedOption.label === "Entertainment") {
            setEntertainment(parseInt(entertainment) + parseInt(price));
        }
        if (selectedOption.label === "Lend") {
            setLend(parseInt(lend) + parseInt(price));
        }
        if (selectedOption.label === "Miscellaneous") {
            setMiscellaneous(parseInt(miscellaneous) + parseInt(price));
        }
    }
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token, url } = useAuthentication();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 'full',
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/add_expense",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                expense_name: name,
                price: price,
                tag: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                setMonthly(parseInt(monthly) + parseInt(price));
                setYearly(parseInt(yearly) + parseInt(price));
                tagBasedDataUpdate();
                toast("Expense Added Successfully");
            })
            .catch((err) => {
                toast("Error Adding Expense");
            });
    };

    return (
        <div className="">
            <ToastContainer />
            <form className="expense-add-form " onSubmit={handleSubmit}>
                <div className="expense-form-field ">
                    <input
                        className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="text"
                        placeholder="Expense Name"
                        name="expenseName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <input
                    className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div >
                <div className="expense-form-field flex justify-between">
    <Select
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={tags}
        placeholder="Select a tag"
    />
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="w-full bg-zinc-900 border-[.1px] py-6 rounded-sm text-zinc-400 font-light"

                    />
</div>
                </div>


                <div className="expense-form-field flex justify-between gap-2">
                    <textarea
                        placeholder="Description of the payment"
                        name="description"
                        value={description}
                        className="w-[20.5vw] bg-zinc-900 border-[.1px] h-40 py-6 rounded-sm text-zinc-400 font-light"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                <button
                    type="submit"
                    className="add-expense-button expense-form-field w-[20.5vw] h-40 bg-[#78E89E] py-6 rounded-sm text-black text-xl font-light"
                >
                    Submit
                </button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseAddForm;
