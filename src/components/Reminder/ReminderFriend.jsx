import React, { useState } from "react";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ReminderFriendForm({ handleData }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token, url } = useAuthentication();


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/reminders_friend",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                reminder_name: name,
                price: price,
                person_email: personEmail,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.error) {
                    toast(res.data.error);
                } else {
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
            <form
                className="expense-add-form reminder-form "
                onSubmit={handleSubmit}
            >
                <h2 className="reminder-form-heading text-zinc-100">Remind People</h2>
                <div className="expense-form-field">
                    <input
                    className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="text"
                        placeholder="Reminder Name"
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
                <div className="expense-form-field">
                    <input
                    className="w-[42vw] bg-zinc-900 border-[.1px] py-6 rounded-sm font-light"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={personEmail}
                        onChange={(e) => setPersonEmail(e.target.value)}
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
            <ToastContainer />
        </div>
    );
}

export default ReminderFriendForm;
