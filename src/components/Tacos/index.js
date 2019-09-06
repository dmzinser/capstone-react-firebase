import React, { Component } from 'react';

class Tacos extends Component {

  state = {
    tacos: []
  }

 async componentDidMount() {
   const getTacos = await fetch('http://localhost:5000/ga-capstone-c7083/us-central1/app/api/v1/get-tacos')
   const parsedTacos = await getTacos.json()
  this.setState({
    tacos: parsedTacos.data
  })
 }

 render() {
   const { tacos } = this.state
   return (
     <div>
       {tacos.businesses && tacos.businesses.map((t, i) => {
          return(
            <div key={i}>
             {t.name}
            </div>
         )
        })
       }
     </div>
  )
 }
}

export default Tacos;