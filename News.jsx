import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

 static defaultProps = {
   pageSize: 12,
   category: 'science',
   country: 'us'
  }

 static PropTypes = {
   name: PropTypes.number,
   category: PropTypes.string,
   country: PropTypes.string
  }

firstupplater = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
 }

  constructor(props) {
    super(props);
    console.log("Hello i am news components from consructor");
    
    this.state = {
      articles: [],
      loading:false,
      page: 1,
      totalResults:0
    }
    document.title = `${this.firstupplater(this.props.category)} - News`
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07c5031f8a8f4f6f96213eb3e88eab6f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    this.props.setProgress(50);
    let parseData = await data.json()
    this.props.setProgress(70);
    // console.log(parseData);
     this.setState({
       articles: parseData.articles,
       totalResults: parseData.totalResults,
       loading:false
      })
      this.props.setProgress(100);
  }

   async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07c5031f8a8f4f6f96213eb3e88eab6f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parseData = await data.json()
    // // console.log(parseData);
    //  this.setState({
    //    articles: parseData.articles,
    //    totalResults: parseData.totalResults,
    //    loading:false
    // })
    this.updateNews()
  }
  
  fetchMoreData = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07c5031f8a8f4f6f96213eb3e88eab6f&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    let data = await fetch(url)
    let parseData = await data.json()
    // console.log(parseData);
     this.setState({
       articles: this.state.articles.concat(parseData.articles),
       totalResults: parseData.totalResults,
      //  loading:false
     })
   this.setState({page:this.state.page+1})
  }


  // previousClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07c5031f8a8f4f6f96213eb3e88eab6f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data = await fetch(url)
  //   // let parseData = await data.json()
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loading:false
      
  //   // })
  //   this.setState({page:this.state.page-1})
  //   this.updateNews()
  // }

  // nextClick = async () => {
  //   // if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      
  //   // }
  //   // else {
      
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=07c5031f8a8f4f6f96213eb3e88eab6f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //   // let data = await fetch(url)
  //   // this.setState({loading:true})
  //   // let parseData = await data.json()
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parseData.articles,
  //   //   loading:false
  //   // })}
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }
  
  render() { 
    return (
      <div>  
          <h1 className='text-center'>NEWS - Top {this.firstupplater(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner />}
        >
           <div className="container">
              <div className="row">
                 {this.state.articles.map((e)=>{
                    return <div className="col-md-4 my-2" key={e.url}>
                      <NewsItems title={e.title ? e.title : ""} description={e.description ? e.description : ""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt}/>
                  </div>
                 })}      
            </div>
            </div>
            </InfiniteScroll>
       
        {/* <div className="container d-flex justify-content-between">

          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.previousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
        </div>
         */}
      </div>
    )
  }
}

export default News
