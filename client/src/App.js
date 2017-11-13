import React, { Component } from 'react';
//import ReactModal from 'react-modal';
import axios from 'axios';
import Lightbox from 'react-images';
//import logo from './images/cityofsurrey.CityHallwLogo';
import './App.css';



class App extends Component {
 
  constructor(props) {
    super(props);
     this.state = {
      users: [],
      categories: [],
      visible: false,
      open: false,
      currentImage: 0
    };
    axios
    .get('/buttons') 
      .then(res=>{this.setState({ users: res.data })});
    axios
    .get('/categories') 
      .then(res=>{this.setState({ categories: res.data })});

    this.handleClick = this.handleClick.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
   this.openLightbox = this.openLightbox.bind(this);
   this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

    //this.handleOpenModal = this.handleButton.bind(this);
  
}


  handleClick(id,e) {
    e.preventDefault();
    this.setState(prev => ({ visible: !prev.visible }));
    
    var str = this.state.users;
    str[id-1].visible= !this.state.users[id-1].visible;

     const tempstr= str[id - 1];// this will store the full array, but trying to access internal parts will access an updated value :/
     var temppos = str[id - 1].position;
     const tempstr2 = str[id - temppos];
     //var temppos = str[id - 1].cell_id;
     var tempid = str[id - 1].cell_id;
     var tempid2 =  str[id - temppos].cell_id;
     console.log(tempstr);
     console.log(tempstr2);

    if(str[id - 1].position !== 1 && str[id - 1].visible === false){
    str[id - 1] = tempstr2; //switch content of position opening to that of the 1st in the row
     str[id - temppos] = tempstr; //move the content from that which is oppening to 1st in the row
     str[id - temppos].position = 1; //switch pos val of current first in row

     str[id - 1].position =temppos; //switch pos val of piece opening
     
     str[id-1].cell_id = tempid;
     str[id-temppos].cell_id = tempid2;

     }
    for (var i = 0; i< str.length; i++){
      console.log("old")
      console.log(str[i].cell_id);
      console.log(str[i].position);
      if(i >= id- temppos){
      if(str[id-temppos].visible === true){
        if(str[i].visible === false){
          break;
      }
      if(i !==0 &&  str[i].visible === str[id-temppos].visible && i > id-1){
          if(str[i-1].position == 2){
            str[i].position = 3;
          }
          if(str[i-1].position == 1){
            str[i].position = 2;
          }
            if(str[i-1].position == 3){
            str[i].position = 1;
          }
      }
    }
      else{
          if(str[i].visible === false && i > id-temppos){
          break;
      }
      if(str[i].visible === true){
        if(str[i].position ===1){
          str[i].position =3;
        }
        else{
        str[i].position = str[i].position - 1;
        }

      }
    }
  }
    console.log("new")
      console.log(str[i].cell_id);
      console.log(str[i].position);
    }

    
    this.setState({users:str});
    //in the future modify this so when a box expands it will remain on the same line and will switch order with other boxes that are pushed to the next line
    //if the moudulo of the id value %3 does not equal 0 then take the value - remainder when doing a modulo 3 and make it that value and and te on that is that value is now the original id
    //also would need to check how many boxes before the chosen number are currently open, and add the the open boxes * 2 to the value being moduloed, this is because each open 1 adds 2 spaces
  }

  openLightbox (id,index,event) {
    event.preventDefault();

    var str = this.state.users;
    str[id-1].open= true
    
    this.setState({
      currentImage: index,
      users:str
    });
  }
  closeLightbox(id,event){
    var str = this.state.users;
    str[id-1].open= false
    this.setState({users:str});
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
 
   handleCategory(button) {
     var str = this.state.categories;
     for (var i = 0; i < str.length; i++) { 
    str[i].cat_sel= false
    }
    str[button-1].cat_sel= true
    this.setState({categories:str});

    console.log('Button is: ' + button);
    axios.post('/send_category', {
    category: button
    })
    .then(res=>{this.setState({ users: res.data })});}

  render() {
    return (
      <div className="App">
      <div className="App-header">
        <h1> Dylan Belvedere - Portfolio </h1>

        <a href="https://github.com/Tin-Man-Dylan" class="nounderline" target="_blank" > <img className="social" height="20px" src={require("./images/icons/github black.svg")} /></a>
        <a href="https://www.linkedin.com/in/dylan-belvedere/" class="nounderline" target="_blank"> <img className="social" height="20px" src={require("./images/icons/linkedin black.svg")} /></a>
        <a href={require("./images/icons/resume.pdf")} class="nounderline" target="_blank"> <img className="social" height="20px" src={require("./images/icons/resume.png")} /></a><br/>
        </div>  

        

        {this.state.categories.map(cat =>
          <div className="Inline-butts" key={cat.cell_id}><button id="Category" className={cat.cat_sel ? 'selected' : 'normal'} onClick={() => this.handleCategory(cat.cell_id)}>{cat.button}</button>
              {/*will use an axios post with  to send which ever category the putton is to the js that retrieves the json, in here there will ba a switch on what data is sent over
                it will respond by sending back a new set of data to users object (see old react for examples),need to change CSS so category button stays highlighted after click.
              In future maybe categories should be moved to a single JSON file, and just have categoty as a field, so it is more easier expandable*/}
          </div>
        )}

        <br/><br/>

        
        <div className="Main-content">
        {this.state.users.map(user =>
          <div id="InfoBox" className={user.visible ? 'slideIn' : 'slideOut'}  key={user.cell_id} >
          <div id="DetailBox">
              <h3>{user.title}</h3>
              <div id="Skills">Skills: {user.skills}</div>

              <a href="" onClick={(e) => this.openLightbox(user.cell_id,0,e)}><img className="PicSet" src={require(`${user.pic}`)}  alt={user.title}/></a>
               <Lightbox
                    images={[{ src: require(`${user.pic}`) }, { src: require(`${user.pic2}`) }]}//in the fiture could have this array created from pulling form a set of pics for varying sizes (using a function)
                    isOpen={user.open}
                    onClose={(e) => this.closeLightbox(user.cell_id,e)/*this.closeLightbox*/}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrevious}
                    currentImage={this.state.currentImage}
                    backdropClosesModal={true}
              />

              <button className="Expand-button" onClick={(e) => this.handleClick(user.cell_id,e)} id={user.cell_id}>{user.visible ? 'Expand Info »' : '« Hide Info'}</button>
              </div>
              <div id="DetailBox" className={user.visible ? 'slideIn' : 'slideOut'}><p>{user.description}</p> </div>
              <div id="DetailBox" className={user.visible ? 'slideIn' : 'slideOut'}><a href="" onClick={(e) => this.openLightbox(user.cell_id,1,e)}><img className="PicSet2" src={require(`${user.pic2}`)}  alt={user.title}/></a></div>

          </div>
        )}
        </div>


      </div>
    );
  }
}

export default App;
