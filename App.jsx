import './App.css'
import Navbar from './components/Navbar'
import News from './components/News'

import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress:10
  }
  setProgress = (progress) => {
  this.setState({progress:progress})
}

  render() {
    return (
      <div>
      <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
          {/* <News setProgress={this.setProgress} pageSize={12} category='sports' country='us' /> */}
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} key="general" pageSize={12} category='general' country='us' />}/>
            <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={12} category='business' country='us'/>}/>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={12} category='entertainment' country='us'/>}/>
            <Route exact path='/general' element={<News setProgress={this.setProgress} key="general" pageSize={12} category='general' country='us'/>}/>
            <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={12} category='health' country='us'/>}/>
            <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={12} category='science' country='us'/>}/>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={12} category='sports' country='us'/>}/>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={12} category='technology' country='us'/>}/>
          </Routes>
    </BrowserRouter>
      </div>
    )
  }
}


