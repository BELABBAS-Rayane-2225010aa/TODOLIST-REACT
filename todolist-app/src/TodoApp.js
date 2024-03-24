import React from "react";
import './App.css';
import Header from './Header';
import Footer from './Footer';

class TodoApp extends React.Component {
    openModal = () => this.setState({open: true});
    closeModal = () => this.setState({open: false});
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { text: "Learn JavaScript", isChecked: false },
                { text: "Learn React", isChecked: false },
                { text: "Play around in JSFiddle", isChecked: true },
                { text: "Build something awesome", isChecked: true }
            ],
            inputTask: "Une tâche",
            searchTxt: "",
            open: false
        };
        this.addTask = this.addTask.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        const storedItems = localStorage.getItem("todoItems");
        if (storedItems) {
            this.setState({ items: JSON.parse(storedItems) });
        }
    }

    componentDidUpdate() {
        localStorage.setItem("todoItems", JSON.stringify(this.state.items));
    }

    render() {
        const filteredItems = this.state.items.filter((item) =>
            item.text.toLowerCase().includes(this.state.searchTxt.toLowerCase())
        );
        return (
            <div className="container">
                <Header
                    totalTasks={this.state.items.length}
                    remainingTasks={this.state.items.filter((item) => !item.isChecked).length}
                />
                <h2>Tasks:</h2>
                <div className="taskList">
                    <ol>
                        {filteredItems.map((item, index) => (
                            <li key={index}>
                                <div className="btnDiv">
                                    <button className="order" onClick={() => this.moveTaskUp(index)}>⬆</button>
                                    <button className="order" onClick={() => this.moveTaskDown(index)}>⬇</button>
                                    <button className="delete" onClick={() => this.delTask(index)}>🗑️</button>
                                </div>
                                <input className="checkBox" type="checkbox" readOnly
                                       checked={item.isChecked} onChange={() => this.changeIsChecked(index)}/>

                                <span className={item.isChecked ? "isChecked" : ""}>{item.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <Footer
                    addTask={this.addTask}
                    searchTxt={this.state.searchTxt}
                    open={this.state.open}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    handleSearch={this.handleSearch}
                    handleInput={this.handleInput}
                />
            </div>
        )
    }

    handleInput(event) {
        this.setState({inputTask: event.target.value});
    }

    changeIsChecked(index) {
        const updatedItems = [...this.state.items];
        updatedItems[index].isChecked = !updatedItems[index].isChecked;
        this.setState({ items: updatedItems });
    }

    delTask(id) {
        if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            const updatedItems = [...this.state.items];
            updatedItems.splice(id, 1);
            this.setState({ items: updatedItems });
        }
    }

    addTask() {
        this.setState(previousState => ({
            items : [...previousState.items,{text : this.state.inputTask, isChecked:false}]
        }));
    }

    handleSearch(event) {
        this.setState({ searchTxt: event.target.value });
    }

    moveTaskUp = (id) => {
        if (id > 0) {
            this.setState(prevState => {
                const newItems = [...prevState.items];
                const temp = newItems[id];
                newItems[id] = newItems[id - 1];
                newItems[id - 1] = temp;
                return { items: newItems };
            });
        }
    }

    moveTaskDown = (id) => {
        if (id < this.state.items.length - 1) {
            this.setState(prevState => {
                const newItems = [...prevState.items];
                const temp = newItems[id];
                newItems[id] = newItems[id + 1];
                newItems[id + 1] = temp;
                return { items: newItems };
            });
        }
    }

}
export default TodoApp;