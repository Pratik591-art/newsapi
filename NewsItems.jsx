import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props
    return (
      <div>
        <div className="card">
          <img src={!imageUrl?"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iJ4S96xF0jNA/v0/1200x800.jpg":imageUrl}/>
            <div className="card-body">
               <h5 className="card-title">{title}</h5>  
            <p className="card-text">{description}</p>    
            <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
