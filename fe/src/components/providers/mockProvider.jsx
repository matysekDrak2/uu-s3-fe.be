import {createContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {Button, Col, Form, Row} from "react-bootstrap";
import LoginForm from "../user/loginForm.jsx";
import {v4} from "uuid";

export const MockContext = createContext({
    isMock: true,
    currentUserMock: {
        id: "",
        name: "",
        email: "",
        password: ""
    },
    usersMock: [],
    toggleMock: () => {},
    accessibleLists: [{}],
    getTasksMock: (listId) => {return [{}]},
    createListMock: (name) => {},
    updateListMock: (listId, object) => {},
    updateTasksMock: (taskId, object) => {},
    createTaskMock: (listId, text) => {},
    deleteListMock: (listId) => {},
    deleteTaskMock: (taskId) => {},
    leaveListMock: (listId, userId) => {},
});

function MockProvider({ children }) {
    const [isMock, setIsMock] = useState(true);

    const toggleMock = () => {
        setIsMock((prev) => !prev);
    };

    const [users] = useState(JSON.parse(`[
  {
    "id": "14a44562-1330-47d9-ac8e-b7b402cccf10",
    "name": "User 5",
    "email": "user5@example.com",
    "password": "39c6f5329e959b2af0deb0f8dacbcdf5418204f46baed50388f62b047c9223c66ff470031ecd653a49f6eff6fa876811e46f0c269390a8bf61f4f983729e1083"
  },
  {
    "id": "12343768-7faa-459c-b19b-5eec594293fa",
    "name": "User 4",
    "email": "user4@example.com",
    "password": "11961811bd4e11f23648afbd2d5c251d2784827147f1731be010adaf0ab38ae18e5567c6fd1bee50a4cd35fb544b3c594e7d677efa7ca01c2a2cb47f8fb12b17"
  },
  {
    "id": "af24f4ea-05f0-496c-bc28-0be05fd0412f",
    "name": "User 3",
    "email": "user3@example.com",
    "password": "2a64d6563d9729493f91bf5b143365c0a7bec4025e1fb0ae67e307a0c3bed1c28cfb259fc6be768ab0a962b1e2c9527c5f21a1090a9b9b2d956487eb97ad4209"
  },
  {
    "id": "625cca1f-30cc-4508-bef9-c623d28255e1",
    "name": "User 2",
    "email": "user2@example.com",
    "password": "92a891f888e79d1c2e8b82663c0f37cc6d61466c508ec62b8132588afe354712b20bb75429aa20aa3ab7cfcc58836c734306b43efd368080a2250831bf7f363f"
  },
  {
    "id": "28745adb-e321-4ee6-9adc-00802ea91831",
    "name": "User 1",
    "email": "user1@example.com",
    "password": "bc547750b92797f955b36112cc9bdd5cddf7d0862151d03a167ada8995aa24a9ad24610b36a68bc02da24141ee51670aea13ed6469099a4453f335cb239db5da"
  }
]
`))

    const [currentUser, setCurrentUser] = useState(users[2])

    const [lists, setLists] = useState(JSON.parse(`[
  {
    "id": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [],
    "name": "List 20",
    "archived": false
  },
  {
    "id": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f",
      "14a44562-1330-47d9-ac8e-b7b402cccf10"
    ],
    "name": "List 19",
    "archived": false
  },
  {
    "id": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "ownerId": "14a44562-1330-47d9-ac8e-b7b402cccf10",
    "cooperators": [
      "28745adb-e321-4ee6-9adc-00802ea91831",
      "28745adb-e321-4ee6-9adc-00802ea91831",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f"
    ],
    "name": "List 18",
    "archived": false
  },
  {
    "id": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [
      "af24f4ea-05f0-496c-bc28-0be05fd0412f",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f"
    ],
    "name": "List 17",
    "archived": false
  },
  {
    "id": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "ownerId": "af24f4ea-05f0-496c-bc28-0be05fd0412f",
    "cooperators": [
      "12343768-7faa-459c-b19b-5eec594293fa",
      "625cca1f-30cc-4508-bef9-c623d28255e1",
      "14a44562-1330-47d9-ac8e-b7b402cccf10"
    ],
    "name": "List 16",
    "archived": false
  },
  {
    "id": "05aa12c4-d0de-4a8f-a792-ce4b0d305c85",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [],
    "name": "List 15",
    "archived": false
  },
  {
    "id": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "ownerId": "625cca1f-30cc-4508-bef9-c623d28255e1",
    "cooperators": [
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f"
    ],
    "name": "List 14",
    "archived": false
  },
  {
    "id": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [
      "14a44562-1330-47d9-ac8e-b7b402cccf10"
    ],
    "name": "List 13",
    "archived": false
  },
  {
    "id": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "ownerId": "625cca1f-30cc-4508-bef9-c623d28255e1",
    "cooperators": [
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "14a44562-1330-47d9-ac8e-b7b402cccf10"
    ],
    "name": "List 12",
    "archived": false
  },
  {
    "id": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [
      "625cca1f-30cc-4508-bef9-c623d28255e1",
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "625cca1f-30cc-4508-bef9-c623d28255e1"
    ],
    "name": "List 11",
    "archived": false
  },
  {
    "id": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [],
    "name": "List 10",
    "archived": true
  },
  {
    "id": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "ownerId": "af24f4ea-05f0-496c-bc28-0be05fd0412f",
    "cooperators": [],
    "name": "List 9",
    "archived": false
  },
  {
    "id": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "ownerId": "14a44562-1330-47d9-ac8e-b7b402cccf10",
    "cooperators": [
      "af24f4ea-05f0-496c-bc28-0be05fd0412f",
      "28745adb-e321-4ee6-9adc-00802ea91831",
      "28745adb-e321-4ee6-9adc-00802ea91831"
    ],
    "name": "List 8",
    "archived": false
  },
  {
    "id": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "ownerId": "af24f4ea-05f0-496c-bc28-0be05fd0412f",
    "cooperators": [],
    "name": "List 7",
    "archived": false
  },
  {
    "id": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [],
    "name": "List 6",
    "archived": false
  },
  {
    "id": "e0cf7b76-7478-411d-b6fd-e055cc82274c",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [],
    "name": "List 5",
    "archived": false
  },
  {
    "id": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [
      "af24f4ea-05f0-496c-bc28-0be05fd0412f"
    ],
    "name": "List 4",
    "archived": true
  },
  {
    "id": "f34556c7-3d42-4633-b8d5-50d71c2a93e5",
    "ownerId": "12343768-7faa-459c-b19b-5eec594293fa",
    "cooperators": [
      "28745adb-e321-4ee6-9adc-00802ea91831",
      "625cca1f-30cc-4508-bef9-c623d28255e1"
    ],
    "name": "List 3",
    "archived": false
  },
  {
    "id": "badb07ab-f51c-462b-9687-55126e851211",
    "ownerId": "625cca1f-30cc-4508-bef9-c623d28255e1",
    "cooperators": [
      "12343768-7faa-459c-b19b-5eec594293fa",
      "12343768-7faa-459c-b19b-5eec594293fa",
      "28745adb-e321-4ee6-9adc-00802ea91831"
    ],
    "name": "List 2",
    "archived": true
  },
  {
    "id": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "ownerId": "28745adb-e321-4ee6-9adc-00802ea91831",
    "cooperators": [
      "14a44562-1330-47d9-ac8e-b7b402cccf10",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f",
      "af24f4ea-05f0-496c-bc28-0be05fd0412f"
    ],
    "name": "List 1",
    "archived": false
  }
]`))
    const accessibleLists = useMemo(() => {
        console.log("MOCK accessibleShoppingLists reload")
        if (!currentUser) return []
        const acsL = lists.filter(item => item.ownerId === currentUser.id || item.cooperators.includes(currentUser.id))
        console.log("MOCK accessibleShoppingLists: ", acsL)
        return acsL
    }, [currentUser, lists])
    const updateList = (listId, object) => {
        setLists((prev)=>{
            const newList = [...prev]
            const index = newList.findIndex(item => item.id === listId)
            if (index === -1) return newList
            const item = newList[index]
            if (item.archived) throw new Error("List is archived")
            if (Object.keys(object).includes('id')) throw new Error("You can't change the id of a list")
            newList[index] = {
                ...item,
                ...object
            }
            return newList
        })
    }
    const createList = (listName) => {
        const newList = {
            id: v4(),
            name: listName,
            ownerId: currentUser.id,
            cooperators: [],
            archived: false
        }
        setLists((prev)=>([...prev, newList]))
    }
    function deleteListMock(listId){
        console.log("MOCK delete triggered")
        const newData = lists.filter(item => item.id !== listId)
        setLists(newData)
    }

    const [tasks, setTasks] = useState(JSON.parse(`[
  {
    "id": "68b42dc5-6f80-4e6d-8b72-e2ee6d136233",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 150",
    "done": false
  },
  {
    "id": "98e4bec6-6c51-4c34-9ddb-5edfb74342fc",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 149",
    "done": false
  },
  {
    "id": "4c387226-47b2-4f97-85b5-9121d74dafbb",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 148",
    "done": false
  },
  {
    "id": "08f3d35b-2bd0-4da0-b13b-31471a2e6a4f",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 147",
    "done": false
  },
  {
    "id": "aa3623d9-d484-44c5-b947-021c91c92ff6",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 146",
    "done": true
  },
  {
    "id": "150c33ed-c5ed-4472-9c7c-55d003b38793",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 145",
    "done": true
  },
  {
    "id": "d24271e1-f0b4-488d-bac7-eac1b045da02",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 144",
    "done": false
  },
  {
    "id": "d56a82ba-8f8a-40da-ace8-c99ec1ec4f44",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 143",
    "done": true
  },
  {
    "id": "9f5c24f1-e45e-44ed-a124-a1426968604c",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 142",
    "done": false
  },
  {
    "id": "7334423e-2d05-4d1d-9a52-2ca337dde337",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 141",
    "done": false
  },
  {
    "id": "4aa78314-83a2-4c32-9748-43728bebc843",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 140",
    "done": true
  },
  {
    "id": "9248407c-b679-48a1-a334-10aa8b78ddac",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 139",
    "done": false
  },
  {
    "id": "7be27212-4cb8-4f39-aed6-64e5ead14663",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 138",
    "done": false
  },
  {
    "id": "743fd544-7b73-4e1d-972c-d88054166eeb",
    "taskListId": "e0cf7b76-7478-411d-b6fd-e055cc82274c",
    "text": "task 137",
    "done": false
  },
  {
    "id": "0342e51d-11c7-4a30-b117-a69251ec4eb6",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 136",
    "done": false
  },
  {
    "id": "54fed9f7-2782-4d76-8dc7-a2e7851ac74d",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 135",
    "done": false
  },
  {
    "id": "ac56aeb4-fa08-4046-9ef4-44a2f11f8089",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 134",
    "done": true
  },
  {
    "id": "283949c3-cf04-410a-b804-836347440528",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 133",
    "done": false
  },
  {
    "id": "c047e7e9-706a-403c-9858-61e52a00cbd1",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 132",
    "done": false
  },
  {
    "id": "d6af925c-6285-4239-aa51-d41548a6d060",
    "taskListId": "e0cf7b76-7478-411d-b6fd-e055cc82274c",
    "text": "task 131",
    "done": false
  },
  {
    "id": "cef16b76-74e3-4397-a8f2-811663d6e6ad",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 130",
    "done": false
  },
  {
    "id": "3de4fb6f-f5cd-4630-9b0a-8f9f6409209d",
    "taskListId": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "text": "task 129",
    "done": true
  },
  {
    "id": "16ded429-abe0-4ebe-906b-cfa886e0f6c4",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 128",
    "done": false
  },
  {
    "id": "e85b42a8-69e1-43ce-97db-7c62e62b63c1",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 127",
    "done": false
  },
  {
    "id": "37ac6290-4807-471d-a527-2366bfa6c7c3",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 126",
    "done": true
  },
  {
    "id": "7116d2ae-ffcc-42c2-9b7b-83b33cf33428",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 125",
    "done": false
  },
  {
    "id": "273e5e8e-420c-4941-8a60-880b020d8385",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 124",
    "done": false
  },
  {
    "id": "1e268d53-3e67-4dad-ba67-03bd8c0f34f2",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 123",
    "done": false
  },
  {
    "id": "ce8e8fdc-6621-48ea-963e-2c5b15370b06",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 122",
    "done": false
  },
  {
    "id": "01c35199-1ec2-485a-9123-c6fb1b1e0bd3",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 121",
    "done": false
  },
  {
    "id": "3e05ca7d-64f8-477f-a082-760595f71039",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 120",
    "done": false
  },
  {
    "id": "a269f0df-1a3c-4df1-8b51-bcf152c626da",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 119",
    "done": false
  },
  {
    "id": "57bbe4b6-6751-4f9b-99a3-199947ab471e",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 118",
    "done": false
  },
  {
    "id": "f2f30907-2732-4a25-af45-4e50dea3a2ef",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 117",
    "done": false
  },
  {
    "id": "1eafb32e-88ba-46a4-b902-15864759b485",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 116",
    "done": false
  },
  {
    "id": "47a204ad-2f11-4a11-b39a-86a657c34583",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 115",
    "done": false
  },
  {
    "id": "e1eb9572-4970-46a5-9eeb-eca4ee26efd5",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 114",
    "done": false
  },
  {
    "id": "8229b799-e121-4d2d-ba90-f8eed42b7b1d",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 113",
    "done": false
  },
  {
    "id": "77479cea-0bed-4c30-8a97-2e4bfe618d2e",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 112",
    "done": false
  },
  {
    "id": "6ba3982d-0938-4a29-8133-db01b690b437",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 111",
    "done": false
  },
  {
    "id": "344b164a-171d-403f-bd18-0b91aca9a3cc",
    "taskListId": "f34556c7-3d42-4633-b8d5-50d71c2a93e5",
    "text": "task 110",
    "done": false
  },
  {
    "id": "4df3edca-0e7c-45a6-85ad-8e5074bde250",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 109",
    "done": false
  },
  {
    "id": "bba65740-5810-47ec-bea7-7f446c719a35",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 108",
    "done": true
  },
  {
    "id": "3e60e297-fa7f-4fc6-9944-90896ab6b1ca",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 107",
    "done": false
  },
  {
    "id": "b27c7743-e810-436e-8257-b6936a735f21",
    "taskListId": "05aa12c4-d0de-4a8f-a792-ce4b0d305c85",
    "text": "task 106",
    "done": false
  },
  {
    "id": "85c17c94-4ba5-47ff-a4ce-4b768e356c9c",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 105",
    "done": false
  },
  {
    "id": "ecc3caa2-a3df-4864-b5c3-2db1b6f687d5",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 104",
    "done": false
  },
  {
    "id": "fecad8eb-14bd-42b2-a242-496e2295c42d",
    "taskListId": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "text": "task 103",
    "done": false
  },
  {
    "id": "582cb4a0-5f38-4683-ace8-2df9e4525672",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 102",
    "done": false
  },
  {
    "id": "d10e30d4-096f-4ac8-bd4e-40b4993ec555",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 101",
    "done": false
  },
  {
    "id": "7b18069e-2052-4259-9ae0-c17425f4bca2",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 100",
    "done": false
  },
  {
    "id": "4c41f357-0303-48f8-8e0f-39d90fd4c6b5",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 99",
    "done": false
  },
  {
    "id": "8ba9eba9-9130-4e4b-a050-d860e5a20830",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 98",
    "done": false
  },
  {
    "id": "14c20ced-8c32-4d5e-9430-f35160ae29b8",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 97",
    "done": false
  },
  {
    "id": "7bbb9ff8-a4ae-4a79-b708-8bcaab273453",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 96",
    "done": false
  },
  {
    "id": "040e571a-3e0f-4b9a-a983-b02ff82b9aa5",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 95",
    "done": false
  },
  {
    "id": "57f4cf87-4b36-4d3b-a2e9-3713c42c49e2",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 94",
    "done": false
  },
  {
    "id": "28353785-cead-4746-a042-c043fe1df3d7",
    "taskListId": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "text": "task 93",
    "done": false
  },
  {
    "id": "f9e3a702-ab68-45c6-8aeb-a502b169adfa",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 92",
    "done": false
  },
  {
    "id": "7ca60d73-9b3a-462c-99dc-fa841bea37eb",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 91",
    "done": false
  },
  {
    "id": "c557d2e4-f0f4-4bbc-90bc-6b31c8d2835c",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 90",
    "done": false
  },
  {
    "id": "b438b632-c90c-405f-831b-0f31e13e3ae8",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 89",
    "done": true
  },
  {
    "id": "768902c1-c22d-48b5-a9d0-fe68c46dc239",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 88",
    "done": true
  },
  {
    "id": "e7d21f7b-408a-45b3-b372-b2ad21f73069",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 87",
    "done": false
  },
  {
    "id": "ac1ea0be-062c-415b-8f47-25f66bb8fa0b",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 86",
    "done": false
  },
  {
    "id": "671fbd5c-7548-4101-91b8-dc7ac8a45f03",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 85",
    "done": false
  },
  {
    "id": "6fa2b112-5a8d-405b-89b8-a871d012eb72",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 84",
    "done": false
  },
  {
    "id": "24ee0419-674e-4e98-8f26-1d851efe670d",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 83",
    "done": false
  },
  {
    "id": "4f5a0983-b04c-43bc-bc97-cb11efa09109",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 82",
    "done": false
  },
  {
    "id": "be7a2c6d-fca0-4933-94ee-e01afc46a98a",
    "taskListId": "e0cf7b76-7478-411d-b6fd-e055cc82274c",
    "text": "task 81",
    "done": false
  },
  {
    "id": "0f43a11f-7a01-4c92-8785-816c500ec0c5",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 80",
    "done": false
  },
  {
    "id": "b01da020-6d6d-4d71-bca8-8a02005c2e56",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 79",
    "done": true
  },
  {
    "id": "77def5de-11ad-4f39-85fa-fb5e620327af",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 78",
    "done": false
  },
  {
    "id": "f60ee711-a874-4975-aad9-04fac538c1f0",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 77",
    "done": false
  },
  {
    "id": "40e1a0d6-6510-4d55-9b5f-0f555770c482",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 76",
    "done": false
  },
  {
    "id": "20fff814-c235-4300-b1dc-fc7c822f4c37",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 75",
    "done": false
  },
  {
    "id": "c21d1bb6-5ab5-4837-8d1c-79ca77cf7ed8",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 74",
    "done": false
  },
  {
    "id": "e38a56e6-1fb1-4d59-9c4a-b3607b0ac236",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 73",
    "done": false
  },
  {
    "id": "3a394efa-b57e-41f2-bf5c-e6585b1c665f",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 72",
    "done": false
  },
  {
    "id": "ae89b444-df72-4234-986d-84cb54cda7d7",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 71",
    "done": false
  },
  {
    "id": "d817ee00-b5e2-42aa-9dd8-1759eabca285",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 70",
    "done": false
  },
  {
    "id": "1c9aceff-ca1b-43b3-afd4-e394153c44dc",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 69",
    "done": false
  },
  {
    "id": "2b2e39ab-1bf4-4647-aa8d-4cb9661a2624",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 68",
    "done": false
  },
  {
    "id": "abe73814-17ac-4dd5-ab3a-89bdd94daf6b",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 67",
    "done": false
  },
  {
    "id": "2b297264-9bcb-45f7-bcae-7c56b3d2360a",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 66",
    "done": false
  },
  {
    "id": "88fdd231-4808-4491-93de-70e7f6e7b062",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 65",
    "done": false
  },
  {
    "id": "f735e753-e793-4ede-9a0f-892040f47782",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 64",
    "done": false
  },
  {
    "id": "57a927f2-b43d-443c-b142-362f20ef1e59",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 63",
    "done": false
  },
  {
    "id": "deb02f79-e666-4b72-8820-9f956f9ef2e8",
    "taskListId": "f34556c7-3d42-4633-b8d5-50d71c2a93e5",
    "text": "task 62",
    "done": true
  },
  {
    "id": "384f0f72-eb03-4eea-ab5d-87b0c65793e4",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 61",
    "done": false
  },
  {
    "id": "2a2f0c2f-4143-48b9-ab75-ee3709ae0a5a",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 60",
    "done": false
  },
  {
    "id": "ee444b5d-1fe0-42d8-a86a-1ae698954537",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 59",
    "done": false
  },
  {
    "id": "8c428e68-a579-4f7f-99db-7118177acc3d",
    "taskListId": "05aa12c4-d0de-4a8f-a792-ce4b0d305c85",
    "text": "task 58",
    "done": false
  },
  {
    "id": "06449545-eadd-44f7-98f0-b05ebfa63dbb",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 57",
    "done": false
  },
  {
    "id": "9f517982-5e86-4f0a-b87a-346ce9f9bb87",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 56",
    "done": false
  },
  {
    "id": "aef2e1a2-18c4-4c2d-8605-cb6070730874",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 55",
    "done": false
  },
  {
    "id": "a2494aff-da4c-41af-a026-6a4e7efb858d",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 54",
    "done": false
  },
  {
    "id": "e20e4de5-fa4d-4f59-b43b-dc4c16634382",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 53",
    "done": false
  },
  {
    "id": "972201fa-7b62-4c4b-ad75-ec0547ae32fa",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 52",
    "done": false
  },
  {
    "id": "af1be9bc-8f0b-4d83-8feb-27735b514b3f",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 51",
    "done": false
  },
  {
    "id": "62d65143-05ad-49c2-a4fe-31c0848c7652",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 50",
    "done": false
  },
  {
    "id": "332d8954-f23b-4703-84a9-a9c610ee8c6b",
    "taskListId": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "text": "task 49",
    "done": false
  },
  {
    "id": "00a595ea-4c46-4980-b43c-e97dcbde4ecf",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 48",
    "done": false
  },
  {
    "id": "b74c1e9f-fce9-45cd-baca-7d9e82435746",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 47",
    "done": false
  },
  {
    "id": "77a487cf-988c-4770-9ea8-b02dca2de381",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 46",
    "done": false
  },
  {
    "id": "d4b0ed2f-5882-482f-8987-1d925bd756f7",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 45",
    "done": false
  },
  {
    "id": "afc29eeb-cdf9-4b7a-a7d9-afaf0f1734d9",
    "taskListId": "5c739d10-088c-459a-995c-dfb3c9dae39a",
    "text": "task 44",
    "done": false
  },
  {
    "id": "d9290392-2163-4ae2-ab20-5ad3f04f2189",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 43",
    "done": false
  },
  {
    "id": "6a6e87fc-a8ee-4bf4-b44a-ef35b7735789",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 42",
    "done": false
  },
  {
    "id": "f3ab5b06-0f16-47ed-bf6f-28c4b1f1b0f0",
    "taskListId": "2fe84f10-f379-4b66-a88f-1078818bcf92",
    "text": "task 41",
    "done": false
  },
  {
    "id": "72dd54b0-a7d7-4424-9fa8-d20c4dd3ac97",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 40",
    "done": false
  },
  {
    "id": "b6fcb58b-104f-4320-8042-1127c7a19877",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 39",
    "done": false
  },
  {
    "id": "b7a69b68-e33e-45d9-a1eb-d60ab85f689d",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 38",
    "done": false
  },
  {
    "id": "d2a65909-2fa3-4871-9b29-5040ff15b1ac",
    "taskListId": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "text": "task 37",
    "done": false
  },
  {
    "id": "2c03924e-6071-450d-977e-7167e511f5de",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 36",
    "done": false
  },
  {
    "id": "cbf44e86-f5ad-4b83-a4e1-78fc7be7831f",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 35",
    "done": false
  },
  {
    "id": "7cfe4327-4f73-4d55-8879-c9df447ea0ac",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 34",
    "done": false
  },
  {
    "id": "1035850d-c930-4369-a91f-c0ab77ee12fc",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 33",
    "done": false
  },
  {
    "id": "f12db721-cdad-49bd-83fa-6403b163244e",
    "taskListId": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "text": "task 32",
    "done": false
  },
  {
    "id": "5412d251-e3e6-477c-ae60-43209750d5d1",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 31",
    "done": false
  },
  {
    "id": "c1f09fb9-aca5-4e76-afe8-20fc664f45b2",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 30",
    "done": false
  },
  {
    "id": "d17efcbe-48d5-4740-ba83-5ad86d1e652a",
    "taskListId": "71710c93-98c3-4c46-a9ab-366ab0152037",
    "text": "task 29",
    "done": false
  },
  {
    "id": "d333f9b8-016a-4cb7-8f5b-cbffd407fc2c",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 28",
    "done": false
  },
  {
    "id": "bb90d2f0-700a-48ca-a6ad-bab64e9a0ba1",
    "taskListId": "2a61b417-c5d1-4ad6-86de-2db656b285fe",
    "text": "task 27",
    "done": false
  },
  {
    "id": "04bdb6ce-ca4d-433a-88a7-9d556655fb1e",
    "taskListId": "f0bd4a5c-67bb-4231-996b-2d1b2163c832",
    "text": "task 26",
    "done": false
  },
  {
    "id": "d75d143d-ac7f-43ca-a444-4a7bb7ae7f10",
    "taskListId": "c1a248d1-bf8b-47c4-8746-c366f129707d",
    "text": "task 25",
    "done": false
  },
  {
    "id": "810678b3-48dc-435b-8efd-701739b3afef",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 24",
    "done": true
  },
  {
    "id": "1aead60a-fe0f-4cec-83bc-5374f59ebea4",
    "taskListId": "05aa12c4-d0de-4a8f-a792-ce4b0d305c85",
    "text": "task 23",
    "done": false
  },
  {
    "id": "4e51a117-bd3d-4451-b5a1-733036f9b664",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 22",
    "done": false
  },
  {
    "id": "687254cb-9320-437a-81e5-93d359559010",
    "taskListId": "f34556c7-3d42-4633-b8d5-50d71c2a93e5",
    "text": "task 21",
    "done": false
  },
  {
    "id": "401defe6-d2fd-42fa-80ad-840c5e463127",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 20",
    "done": false
  },
  {
    "id": "6fa1b49d-3e12-4b90-b3d3-47076d2958d6",
    "taskListId": "05aa12c4-d0de-4a8f-a792-ce4b0d305c85",
    "text": "task 19",
    "done": true
  },
  {
    "id": "d53a0545-3ee2-4eb8-8235-6d7dd1a698c7",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 18",
    "done": false
  },
  {
    "id": "a7953aaf-e22d-478f-bdd8-c9b79f43ce8d",
    "taskListId": "8208a780-f5b4-439c-ac51-65e75ba3aaef",
    "text": "task 17",
    "done": false
  },
  {
    "id": "b815d752-add6-4ff1-b351-c9249218fce7",
    "taskListId": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "text": "task 16",
    "done": false
  },
  {
    "id": "f04fc248-b3bc-4495-b67b-6079a584804a",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 15",
    "done": false
  },
  {
    "id": "5ee1758a-1a5a-4e8c-b36f-dab2f3228db8",
    "taskListId": "badb07ab-f51c-462b-9687-55126e851211",
    "text": "task 14",
    "done": false
  },
  {
    "id": "8cf2fcba-c6ff-4d66-a583-14515ae0c99e",
    "taskListId": "a430ffd0-ed61-462e-95bd-1a95dba78d8b",
    "text": "task 13",
    "done": false
  },
  {
    "id": "c8645477-e768-4919-9d69-51c7c4756499",
    "taskListId": "495f7a51-5b38-4f7b-a55c-1a1c15b38b43",
    "text": "task 12",
    "done": false
  },
  {
    "id": "8e197b4a-8c32-42f0-94c4-5184a66afc25",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 11",
    "done": false
  },
  {
    "id": "9da670a5-39ca-42ab-9f3e-a8976a3b3a38",
    "taskListId": "7cd1044e-af7c-485d-9c5d-4d0cf00655a9",
    "text": "task 10",
    "done": true
  },
  {
    "id": "3bb96c6f-c73e-4126-b2c9-ebde8e5a02fb",
    "taskListId": "f34556c7-3d42-4633-b8d5-50d71c2a93e5",
    "text": "task 9",
    "done": false
  },
  {
    "id": "e431a670-1905-4d9e-9666-1654bb308a3b",
    "taskListId": "5c37d84f-7d19-4cb2-8db7-1a48ac9b75c8",
    "text": "task 8",
    "done": false
  },
  {
    "id": "3bf73409-b4c3-4bbf-9d96-26f20c4aa679",
    "taskListId": "e0cf7b76-7478-411d-b6fd-e055cc82274c",
    "text": "task 7",
    "done": false
  },
  {
    "id": "291ff445-9f87-4fe6-b4e5-d06b02e596e9",
    "taskListId": "b58b97ff-c60c-4de2-8a3b-5b7405537f61",
    "text": "task 6",
    "done": false
  },
  {
    "id": "31ba8bcb-705d-4a54-98c2-e3b4a901ca26",
    "taskListId": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "text": "task 5",
    "done": false
  },
  {
    "id": "2f460315-626d-4f6b-9d98-def8da0e75aa",
    "taskListId": "37893be9-5dce-4563-8f8a-44dda99229ef",
    "text": "task 4",
    "done": false
  },
  {
    "id": "54bc433a-4a3b-4cb5-a040-09912bfee15a",
    "taskListId": "9f2b8c06-04b1-4eea-95c2-745ce9495704",
    "text": "task 3",
    "done": false
  },
  {
    "id": "0b3a5a6d-0dbb-4ccb-a98e-3e6b27f40708",
    "taskListId": "e83aa52f-a750-4fcf-917a-f5fdf48f1ffc",
    "text": "task 2",
    "done": false
  },
  {
    "id": "dfb07f53-016a-42f1-b773-7c43478802e2",
    "taskListId": "1512ca2c-7df5-4839-8b95-76ca410e8d69",
    "text": "task 1",
    "done": false
  }
]`))
    const getTasks = (listId) => {
        return tasks.filter(item => item.taskListId === listId)
    }
    const updateTasks = (taskId, object) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks]
            const index = newTasks.findIndex(item => item.id === taskId)
            if (index === -1) throw new Error("Task not found")
            const item = newTasks[index]
            if (Object.keys(object).includes('id')) throw new Error("Cannot update task id")
            newTasks[index] = {
                ...item,
                ...object
            }
            return newTasks
        })
    }
    const createTask = (listId, text) => {
        if (lists.find(item => item.id === listId).archived) throw new Error("Cannot add task to archived list")
        const newTask = {
            id: v4(),
            taskListId: listId,
            text: text,
            completed: false
        }
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks]
            newTasks.push(newTask)
            return newTasks
        })
    }
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks]
            const index = newTasks.findIndex(item => item.id === taskId)
            if (index === -1) throw new Error("Task not found")
            newTasks.splice(index, 1)
            return newTasks
        })
    }
    const leaveList = (listId, userId = currentUser) => {
        setLists((prev)=>{
            const newLists = [...prev]
            const index = newLists.findIndex(item => item.id === listId)
            if (index === -1) throw new Error("List not found")
            const item = newLists[index]
            newLists[index] = {
                ...item,
                cooperators: [
                    ...item.cooperators.filter(cooperator => cooperator !== userId)
                ]
            }
        })

    }
    const value = {
        isMock,
        usersMock: users,
        currentUserMock: currentUser,
        toggleMock,
        accessibleLists,
        getTasksMock: (listId) => getTasks(listId),
        createListMock: (listName) => createList(listName),
        updateListMock: (listId, object) => updateList(listId, object),
        updateTasksMock: (taskId, object) => updateTasks(taskId, object),
        createTaskMock: (listId, text) => createTask(listId, text),
        deleteListMock,
        deleteTaskMock: (taskId) => deleteTask(taskId),
        leaveListMock: (listId, userId) => leaveList(listId, userId),
    };

    return (
        <MockContext.Provider value={value}>
            <Row sx={1} sm={2} style={{margin: "0px"}}>
                <Col sx={2} sm={2}>
                    <Button onClick={()=>{
                        toggleMock()
                        setCurrentUser(null)
                    }}>
                        {isMock && "Disable Mock"}
                        {!isMock && "Enable Mock"}
                    </Button>
                </Col>
                {isMock && <Col style={{paddingRight: "0px"}} sx={5} sm={5}>
                    <Form.Select onChange={(e)=>{
                        setCurrentUser(users.filter(item => item.email === e.target.value)[0])
                    }}
                    >
                        {users.map((user) => {
                            return (
                                <option key={user.id} id={user.id}>
                                    {user.email}
                                </option>
                            )
                        })}
                    </Form.Select>
                </Col>}
            </Row>
            {children}
        </MockContext.Provider>
    );
}

MockProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default MockProvider;