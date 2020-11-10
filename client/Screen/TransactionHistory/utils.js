import React from 'react'
import { ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Text} from 'react-native'
const historial = (lista,{ navigation }) => {
    const iconList ={Panaderia:"cookie", Almacen:"shopping-basket",Videojuegos:"gamepad", Entretenimiento:"play-circle", 
                     Transporte:"bus-alt", Gasolinera:"gas-pump", Jet:"fighter-jet", Farmacia:"first-aid", Servicios:"file-invoice-dollar"}
   return lista.map((item, i) => (
      <ListItem onPress={() => navigation.navigate("Detalle", {
        title: item.title,
        amount: item.amount,
        icon: item.type
      })} key={i} bottomDivider>
        <Icon name={iconList[item.type]} size={30} color="black" />
        <ListItem.Content >
          <ListItem.Title >{item.title}</ListItem.Title>
          <ListItem.Subtitle>{`${item.type}`}</ListItem.Subtitle>
        </ListItem.Content>
         <Text style={{marginRight:3}}>{`$${item.amount}`}</Text>
        <ListItem.Chevron
         name='chevron-right'
         type='font-awesome'
         color="black"/>
        </ListItem>
    ))
}

export default historial
