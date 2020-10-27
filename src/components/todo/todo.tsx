import React, {ReactDOM} from 'react';
import './todo.css';
import TextareaAutosize from 'react-textarea-autosize';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Card, Col} from "react-bootstrap";
import {Simulate} from "react-dom/test-utils";
import Select from 'react-select';
import {TodoService} from "../../services/todo-service";
import {TodoModel} from "../../models/todo";
import Board from "../../elements/Board";
import Cards from "../../elements/Card";
import {FiEdit, RiDeleteBin4Fill} from "react-icons/all";
import {Bounce, toast, ToastContainer, Zoom} from "react-toastify";
import index from "react-redux-toastr";


type MyState = { name: string; description: string; prio: any; startedTodos: TodoModel[], workingTodos: TodoModel[], finishedTodos: TodoModel[],optionSelected:any };
type MyProps = {};

const options = [
    {value: 'low', label: 'Low'},
    {value: 'mid', label: 'Mid'},
    {value: 'high', label: 'High'},
];

export default class Todo extends React.Component<MyProps, MyState> {
    private colors: string[] = [];
    private todo = new TodoService();

    constructor({props}: { props: any }, private todoService: TodoService) {
        super(props);
        this.state = {
            name: '',
            description: '',
            prio: '',
            startedTodos: [],
            workingTodos: [],
            finishedTodos: [],
            optionSelected: options[0]
        }

        ;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.setChanged = this.setChanged.bind(this);

    }

    setChanged(category: string | null, id: number | null, todo: any) {
        let array = null;
        let result = null;
        console.log(this.state.startedTodos);
        console.log(this.state.workingTodos);
        console.log(this.state.finishedTodos);

        switch (category) {
            case 'todo':
                array = this.state.startedTodos;
              result = array.filter(x=>x.id !== todo.data.id);
                this.setState({startedTodos: result})
                break;
            case 'progress':
                array = this.state.workingTodos;
                result = array.filter(x=>x.id !== todo.data.id);
                this.setState({workingTodos: result})
                break;
            case 'done':
                array = this.state.finishedTodos;
                result = array.filter(x=>x.id !== todo.data.id);
                this.setState({finishedTodos: result})
                break;
        }

        switch (todo.data.category) {
            case 'todo':
                console.log('todo');
                this.setState({startedTodos: this.state.startedTodos.concat(todo.data)});
                break;
            case 'progress':
                console.log('progress');
                this.setState({workingTodos: this.state.workingTodos.concat(todo.data)});
                break;
            case 'done':
                console.log('finished');
                this.setState({finishedTodos: this.state.finishedTodos.concat(todo.data)});
                break;
        }


    }
    componentDidMount(): void {
        this.getTodos();
    }

    setColors() {
        let colorArray = ["#A4D27A", "#4AB9B0", "#FAC140", "#E85A80"];
        while (colorArray.length != 0) {
            let rand = Math.floor(Math.random() * colorArray.length);
            this.colors.push(colorArray[rand]);
            colorArray.splice(rand, 1);
        }


    }

    sortTodos(todos: TodoModel[]) {
        this.setState({startedTodos:[]});
        this.setState({workingTodos:[]});
        this.setState({finishedTodos:[]});
        todos.forEach(x => {
            switch (x.category) {
                case 'todo' :
                    this.setState({startedTodos: this.state.startedTodos.concat(x)});
                    break;
                case 'progress':
                    this.setState({workingTodos: this.state.workingTodos.concat(x)});
                    break;
                case 'done':
                    this.setState({finishedTodos: this.state.finishedTodos.concat(x)});
                    break;
            }


        })

    }


    handleDescriptionChange(e: any) {
        this.setState({description: e.target.value});

    }

    handleChange(event: any) {
        this.setState({name: event.target.value});

    }

    handlePriority = (optionSelected: any) => {
        this.setState(
            {optionSelected},
            () => console.log(`Option selected:`, this.state.optionSelected)
        );
    };

    handleSubmit(event: any) {
        if (this.state.name.length === 0 || this.state.description.length === 0) {
            toast.error('Töltsön ki minden mezőt!');
            console.log('mehet');
            return;
        }
        let todo = new TodoModel(this.state.name, this.state.description, 'todo', this.state.prio.value);
        this.todo.postTodo(todo).then((respDo: TodoModel) => {
            this.setState({startedTodos: this.state.startedTodos.concat(respDo)});
        }).catch(err => console.log(err));
    }

    getTodos() {
        this.todo.getTodos().then((todos: TodoModel[]) => {
            this.sortTodos(todos);
        }).catch(err => err);

    }

    removeItemFromArray =(id:number,category:string) => {
        let array = null;
        let result = null;
        switch (category) {
            case 'todo':
                array = this.state.startedTodos;
                result = array.filter(x=> x.id !== id);
                this.setState({startedTodos: result})
                break;
            case 'progress':
                array = this.state.workingTodos;
                result = array.filter(x=> x.id !== id);
                this.setState({workingTodos: result})
                break;

            case 'done':
                array = this.state.finishedTodos;
                result = array.filter(x=> x.id !== id);
                this.setState({finishedTodos: result})
                break;
        }
    }

    deleteTodo(id: number, category: string) {
        this.todo.deleteTodo(id).then(() => {
            console.log(id + ' deleted');
            this.removeItemFromArray(id,category);
        }).catch(err => err);
    }

    render() {
        this.setColors();
        const renderStartedTodos = () => {
            return <Board className="h-90 overflow-auto"
                          setChanged={this.setChanged}
                          style={{backgroundColor: this.colors[1]}}
                          color={'todo'}>
                {
                    this.state.startedTodos.map(el => <Cards key={el.id}
                                                             className="card"
                                                             id={el.id}
                                                             draggable="true"
                                                             color={el.category}>
                        <Card.Body className="text-white"
                                   style={{backgroundColor: this.colors[1]}}>
                            <Card.Title>{el.name}</Card.Title>
                            <FiEdit/>
                            <div><RiDeleteBin4Fill onClick={() => this.deleteTodo(el.id, el.category)}/></div>
                            <div>

                            </div>

                        </Card.Body></Cards>)
                }
            </Board>
        }
        const renderProgressTodos = () => {
            return <Board className="h-90 overflow-auto "
                          setChanged={this.setChanged}
                          style={{backgroundColor: this.colors[2]}}
                          color={'progress'}>
                {
                    this.state.workingTodos.map(el => <Cards key={el.id}
                                                             className="card"
                                                             id={el.id}
                                                             draggable="true"
                                                             color={el.category}><Card style={{width: '100%'}}>
                        <Card.Body className="text-white"
                                   style={{backgroundColor: this.colors[2]}}>
                            <Card.Title>{el.name}</Card.Title>
                            <FiEdit/>
                            <div><RiDeleteBin4Fill onClick={() => this.deleteTodo(el.id, el.category)}/></div>
                            <div>

                            </div>

                        </Card.Body>
                    </Card></Cards>)
                }
            </Board>
        }
        const renderFinishedTodos = () => {
            return <Board className="h-90 overflow-auto"
                          setChanged={this.setChanged}
                          style={{backgroundColor: this.colors[3]}}
                          color={'done'}>
                {
                    this.state.finishedTodos.map(el => <Cards className="card"
                                                              id={el.id}
                                                              key={el.id}
                                                              draggable="true"
                                                              color={el.category}>
                        <Card.Body className="text-white"
                                   style={{backgroundColor: this.colors[3]}}>
                            <Card.Title>{el.name}</Card.Title>
                            <FiEdit/>
                            <div><RiDeleteBin4Fill onClick={() => this.deleteTodo(el.id, el.category)}/></div>
                            <div>
                            </div>

                        </Card.Body>
                    </Cards>)
                }
            </Board>
        }

        return <div className="row h-100"
                    data-testid="todo">
            <div className="col-2 h-100 text-center title"
                 style={{backgroundColor: this.colors[0]}}>
                <h3 className="text-white">Add todo</h3>
                <div className="row">
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label className="input-label">Name</Label>
                                <Input
                                    onChange={this.handleChange}
                                    name="name"
                                    id="exampleEmail"
                                    placeholder="Todo"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="input-label">Description</Label>
                                <input
                                    type="textarea"
                                    className="form-control"
                                    onChange={this.handleDescriptionChange}
                                    name="name"
                                    id="exampleEmail"
                                    placeholder="Todo description"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label className="input-label">Priority</Label>
                                <Select
                                    value={this.state.optionSelected}
                                    onChange={this.handlePriority}
                                    options={options}
                                />
                            </FormGroup>
                        </Col>
                        <Button
                            onClick={this.handleSubmit}>Submit</Button>
                    </Form>

                </div>
            </div>
            <div className="col-10 h-100">

                <div className="row h-100">
                    <div className="col-4 h-100">
                        <div style={{
                            borderRight: '2px solid ' + this.colors[1],
                            borderLeft: '2px solid ' + this.colors[1],
                            marginTop: '3px'
                        }}><h4 style={{color: this.colors[1]}}>Todos</h4></div>
                        {renderStartedTodos()}


                    </div>
                    <div className="col-4 h-100">
                        <div style={{
                            borderRight: '2px solid ' + this.colors[2],
                            borderLeft: '2px solid ' + this.colors[2],
                            marginTop: '3px'
                        }}><h4 style={{color: this.colors[2]}}>In_Progress</h4></div>
                        {renderProgressTodos()}
                    </div>

                    <div className="col-4 h-100">
                        <div style={{
                            borderRight: '2px solid ' + this.colors[3],
                            borderLeft: '2px solid ' + this.colors[3],
                            marginTop: '3px'
                        }}><h4 style={{color: this.colors[3]}}>Finished</h4></div>
                        {renderFinishedTodos()}
                    </div>
                </div>
            </div>
            <ToastContainer transition={Bounce}
                            autoClose={5000}
                            draggable={true}/>
        </div>
    }

}




