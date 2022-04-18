import React from "react";
import restaurants from "../sample-restaurants";


class Landing extends React.Component {
  state = {
    display: false,
    title: '',
    url: ''
  };

  displayList = () => {
    const { display } = this.state;
    this.setState({ display: !display })
  }

  getTitle = (restaurants) => {
    const { title, url } = restaurants;
    this.setState({ title, url, display: false })
  }

  goToRestaurant = () => {
    const { url } = this.state;
    this.props.history.push(`/restaurants/${url}`);
  }

  render() {
    return (
      <div className="restaurant-select">
        <div className="restaurant-select-top">
          <div onClick={this.displayList} className="restaurant-select-top-header font-effect-outline">
            {this.state.title ? this.state.title : 'Выбери ресторан'}</div>
          <div className="arrow-picker">
            <div className="arrow-picker-up"></div>
            <div className="arrow-picker-down"></div>
          </div>
        </div>
        {this.state.display ? <div className="restaurant-select-bottom">
          <ul>
            {restaurants.map(restaurants => {
              return <li onClick={() => this.getTitle(restaurants)} key={restaurants.id}>{restaurants.title}</li>
            })}
          </ul>
        </div> : null}
        {this.state.title && !this.state.display ? (<button onClick={this.goToRestaurant}>Перейти в ресторан</button>) : null}
      </div>
    )
  }
}

export default Landing;
