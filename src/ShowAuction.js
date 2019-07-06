import React, { Component } from 'react';
import './ShowAuction.css'

export class ShowAuction extends Component{
    handleChange=(name, bid)=>{
        let _name=name;
        this.props.bid(_name)
    }

    render(){
        let bidList = this.props.name.map((name, bid,i)=>
        <tr key={i}>
            <td onClick={this.handleChange.bind(this.name.name)}>{name.name}</td>
            <td>{bid.bid}</td>
        </tr>)

        return(
            <div>
            <h3> Auction</h3>
            <hr />
            <table >
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Bid</th> 
                    </tr>
                    {bidList}
                </tbody>
            </table>
          </div>
        )
    } 
}

export default ShowAuction;