import React from 'react';
import './home.css';
import {Link} from "react-router-dom";


export default class Home extends React.Component {
    colors: any[] = [];

    constructor({props}: { props: any }) {
        super(props);
        this.state = {
            colors: []
        }


    }

    componentDidMount(): void {
        this.setColors();

    }

    componentWillReceiveProps() {

    }

    setColors() {
            let colorArray = [{id:0,color:"#A4D27A", link:'/todo',name:'todo'}, {id:1,color:"#4AB9B0",link:'/todo',name:'placeholder'}, {id:2,color:"#FAC140",link:"/",name:'placeholder'}, {id:3,color:"#E85A80",link:'/todo',name:'placeholder'}];
            let color: any[] = [];
            while (colorArray.length != 0) {
                let rand = Math.floor(Math.random() * colorArray.length);
                this.colors.push(colorArray[rand]);
                colorArray.splice(rand, 1);
            }
            this.setState({colors: color});
            console.log(this.state);


    }

    render() {

        return <div className="h-100">
            <div className="row h-100 text-white alert-danger">
                {

                           this.colors.map(el => <Link className="col-6 h-50 menu-item" key={el.id} id={el.id} style={{backgroundColor: el.color}} to={el.link}><h1 className="menu-item">{el.name}</h1>
                           </Link>)


                }
            </div>
            <div className="row">
                dsadsa
            </div>
        </div>
    }


}



