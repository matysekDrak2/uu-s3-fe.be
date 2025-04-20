import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const DataContext = createContext({
    shoppingLists: [],
    setShoppingLists: () => {},
    users: [],
    setUsers: () => {}
})

function ShoppingListProvider({children}){

    const [shoppingLists, setShoppingLists] = useState([
        {
            id: 1,
            owner: 1,
            cooperators: [],
            name: "Home",
            archyved: false,
            tasks: [
                { id: 1, text: "Buy groceries", checked: false },
                { id: 2, text: "Clean kitchen", checked: false },
                { id: 3, text: "Take out trash", checked: true }
            ]
        },
        {
            id: 2,
            owner: 2,
            cooperators: [3],
            name: "Work",
            archyved: false,
            tasks: [
                { id: 1, text: "Reply to emails", checked: true },
                { id: 2, text: "Prepare presentation", checked: false }
            ]
        },
        {
            id: 3,
            owner: 1,
            cooperators: [],
            name: "Shopping",
            archyved: false,
            tasks: [
                { id: 1, text: "Milk", checked: true },
                { id: 2, text: "Bread", checked: false },
                { id: 3, text: "Eggs", checked: false }
            ]
        },
        {
            id: 4,
            owner: 4,
            cooperators: [2, 3, 4],
            name: "Vacation Planning",
            archyved: true,
            tasks: [
                { id: 1, text: "Book flights", checked: false },
                { id: 2, text: "Reserve hotel", checked: true }
            ]
        },
        {
            id: 5,
            owner: 3,
            cooperators: [],
            name: "Fitness",
            archyved: false,
            tasks: [
                { id: 1, text: "Morning run", checked: true },
                { id: 2, text: "Yoga", checked: false },
                { id: 3, text: "Stretch", checked: false }
            ]
        },
        {
            id: 6,
            owner: 2,
            cooperators: [],
            name: "Groceries",
            archyved: false,
            tasks: [
                { id: 1, text: "Bananas", checked: true },
                { id: 2, text: "Chicken", checked: false },
                { id: 3, text: "Rice", checked: true }
            ]
        },
        {
            id: 7,
            owner: 2,
            cooperators: [1, 2],
            name: "Project X",
            archyved: false,
            tasks: [
                { id: 1, text: "Design layout", checked: false },
                { id: 2, text: "Implement feature", checked: false }
            ]
        },
        {
            id: 8,
            owner: 1,
            cooperators: [],
            name: "Errands",
            archyved: false,
            tasks: [
                { id: 1, text: "Bank", checked: true },
                { id: 2, text: "Post Office", checked: false }
            ]
        },
        {
            id: 9,
            owner: 3,
            cooperators: [2, 4],
            name: "Study Plan",
            archyved: false,
            tasks: [
                { id: 1, text: "Read chapter 3", checked: true },
                { id: 2, text: "Practice problems", checked: false },
                { id: 3, text: "Group discussion", checked: false }
            ]
        },
        {
            id: 10,
            owner: 2,
            cooperators: [],
            name: "Car Maintenance",
            archyved: false,
            tasks: [
                { id: 1, text: "Oil change", checked: false },
                { id: 2, text: "Tire rotation", checked: false }
            ]
        },
        {
            id: 11,
            owner: 4,
            cooperators: [],
            name: "Birthday Party",
            archyved: false,
            tasks: [
                { id: 1, text: "Order cake", checked: true },
                { id: 2, text: "Invite friends", checked: true },
                { id: 3, text: "Decorations", checked: false }
            ]
        },
        {
            id: 12,
            owner: 1,
            cooperators: [3],
            name: "Reading List",
            archyved: false,
            tasks: [
                { id: 1, text: "1984", checked: false },
                { id: 2, text: "To Kill a Mockingbird", checked: true },
                { id: 3, text: "The Great Gatsby", checked: false }
            ]
        },
        {
            id: 13,
            owner: 1,
            cooperators: [],
            name: "Chores",
            archyved: false,
            tasks: [
                { id: 1, text: "Laundry", checked: false },
                { id: 2, text: "Dishes", checked: true },
                { id: 3, text: "Vacuum", checked: false }
            ]
        },
        {
            id: 14,
            owner: 2,
            cooperators: [4],
            name: "Meal Prep",
            archyved: false,
            tasks: [
                { id: 1, text: "Cook rice", checked: true },
                { id: 2, text: "Grill chicken", checked: false }
            ]
        },
        {
            id: 15,
            owner: 3,
            cooperators: [],
            name: "Goals",
            archyved: false,
            tasks: [
                { id: 1, text: "Learn React", checked: false },
                { id: 2, text: "Write blog post", checked: true },
                { id: 3, text: "Meditate", checked: false }
            ]
        }
    ])
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Karl Cot",
            email: "kkkk@l.co"
        },
        {
            id: 2,
            name: "Mark Carlson",
            email: "lolipop@rou.co"
        },
        {
            id: 3,
            name: "Vasek Kovarik",
            email: "kladivko@kovadlinka.co"
        },
        {
            id: 4,
            name: "Dalibor Mark",
            email: "dm@dos.co"
        }
    ])

    const value = {
        shoppingLists,
        setShoppingLists,
        users,
        setUsers
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

ShoppingListProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShoppingListProvider;