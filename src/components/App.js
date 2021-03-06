import React from 'react';
import Header from './header';
import Order from './order';
import MenuAdmin from './menuAdmin';
import sampleBurgers from '../sample-burgers'
import Burger from './Burger';
import base from '../base';

class App extends React.Component {
  state = {
    burgers: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.restaurantId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }


    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: 'burgers'
    })
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addBurger = burger => {
    console.log('addBurger', burger)
    // 1 Делаем копию объекта state
    const burgers = { ...this.state.burgers }
    // 2 Добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger
    // 3. Записать наш новый обхект burgers в state
    this.setState({ burgers })
  }

  updateBurger = (key, updateBurger) => {
    // 1 Делаем копию объекта state
    const burgers = { ...this.state.burgers }
    // 2. обновляем нужный Бургер
    burgers[key] = updateBurger
    // 3. записать обновленный бургер в объект в state
    this.setState({ burgers })
  }

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers })
  }

  addToOrder = (key) => {
    // 1. Делаем копию объекта state
    const order = { ...this.state.order }
    // Добавить ключ к заказу со значением 1 либо обновить текущее значение
    order[key] = order[key] + 1 || 1;
    // 3. Записать наш новый обхект burgers в state
    this.setState({ order })
  }

  render() {
    return (
      <div className='burger-paradise'>
        <div className='menu'>
          <Header title='Hot burgers' />
          <ul className='burgers'>
            {Object.keys(this.state.burgers).map(key => {
              return <Burger
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.burgers[key]}
              />
            })}
          </ul>
        </div>
        <Order burgers={this.state.burgers} order={this.state.order} />
        {/* <Order {...this.state} /> сокращённый вариант написания */}
        <MenuAdmin addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          updateBurger={this.updateBurger}
        />
      </div>
    )
  }
}

export default App;