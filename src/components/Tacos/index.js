import React, { Component } from 'react';

class Tacos extends Component {
 render() {
   const { tacos } = this.props
   
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