import React from 'react'
import { StyleSheet, View, Button, TextInput, Text, FlatList, ActivityIndicator } from 'react-native'
import plants from '../Data/PlantData'
import Plant from './Plant'
import { connect } from 'react-redux'


const green= "#007934"
const grey= "#D3D3D3"
class Search extends React.Component {

  constructor(props){
    super(props)
    this.state={
      plant: [],
      loading: false,
      hover: false
    }
  //  this.navigation
  }

  //For TextInput Style
  handleGrey =event =>{
    this.setState({hover: true})
    if(this.props.onFocus){
      this.props.onFocus(event)
    }
  }

  handleGreen =event =>{
    this.setState({hover: false})
    if(this.props.onBlur){
      this.props.onBlur(event)
    }
  }

  //*****************

  isLoading(){
    if(this.state.loading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  rechercher(e){
    this.setState({loading: true})
    if(e.length > 0){
      this.setState({plant: plants, loading: false })
    }else{
      this.setState({plant: plants, loading: false })
    }
  }

  _afficherDetail = (plant) =>{
    this.props.navigation.navigate('DetailPlant', {plant: plant})
  }

  //fonction pour la recherche
  searchText = (e) => {
    let text = e.toLowerCase()
    let trucks = plants

    // search by food truck name
    let filteredName = trucks.filter((truck) => {
      return truck.title.toLowerCase().match(text)
    });

    // if no match and text is empty
    if(!text || text === '') {
        this.setState({
          plant: plants
        });
      }
    // if no name matches to text output
    else if(!Array.isArray(filteredName) && !filteredName.length) {
      this.setState({
        plant: []
      });
    }
    // if name matches then display
    else if(Array.isArray(filteredName)) {
      this.setState({
        plant: filteredName
      });
    }
  }

  componentDidMount(){
    this.setState({plant: plants})
  }

  render() {
    const { hover }=this.state
    const { onFocus, onBlur } = this.props
    return(
      <View style={{ marginTop: 5 }}>
        <TextInput style={styles.textinput}
                  placeholder="Rechercher par Titre"
                  onChangeText={(e) => this.searchText(e)}
                  selectionColor={green}
                  underlineColorAndroid={
                    hover ? green : grey
                  }
                  onFocus={this.handleGrey}
                  onBlur={this.handleGreen}
                  />
        <Button style={{ height: 50, marginTop: 5}}
                title="Rechercher"/>
        <FlatList
          data={this.state.plant}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Plant plant={item}
                                         afficherDetailPlant={this._afficherDetail}
                                         enFavor={(this.props.favoritesPlant.findIndex(film => film.id === item.id) !== -1) ? true : false}
                                         />}
        />
        {this.isLoading()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  textinput: {
      marginLeft: 10,
      marginRight: 10,
      height: 50,

  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
    favoritesPlant: state.toggleFavorite.favoritesPlant
  }
}

export default connect(mapStateToProps)(Search)
