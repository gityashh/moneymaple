import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const repeatTime = [
    { value: "One Time", label: "One Time" },
    { value: "Every Day", label: "Every Day" },
    { value: "Every Week", label: "Every Week" },
    { value: "Every Month", label: "Every Month" },
    { value: "Every Year", label: "Every Year" },
];

function ReminderForm({ handleData }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token, url } = useAuthentication();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '11.75vw',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/reminders",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                reminder_name: name,
                price: price,
                repeat: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.error){
                    toast(res.data.error);
                }
                else {
                toast("Reminder Added Successfully");
                handleData(res.data.reminders);
                }
            })
            .catch((err) => {
                toast("Error Adding Reminder");
            });
    };

    return (
        <div className="expense-form dashboard-border-radius reminder-form-container bg-zinc-800">
            <ToastContainer />
            <form
                className="w-full"
                onSubmit={handleSubmit}
            >
                <h2 className="reminder-form-heading text-zinc-100">Remind Yourself</h2>
                <div className="expense-form-field">
                    <input
                        className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="text"
                        placeholder="Reminder Name"
                        name="expenseName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="expense-form-field">
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="expense-form-field">
                    <Select
                    styles={customStyles}
                        value={selectedOption}
                        onChange={handleChange}
                        options={repeatTime}
                        placeholder="Repeatation Type"
                        className="select-tag"
                        required
                    />
                </div>

                <div className="expense-form-field">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="w-[20.5vw] bg-zinc-900 border-[.1px] py-6 rounded-sm text-zinc-400 font-light"
                    />
                </div>
                <button
                    type="submit"
                    className="add-expense-button expense-form-field w-[20.5vw] h-12 text-center bg-[#78E89E] py-2 rounded-sm text-black text-xl font-light mt-2"
                
                >
                    Add Reminder
                </button>
            </form>
        </div>
    );
}

export default ReminderForm;
