import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import ItemListCategories from '../screens/ItemListCategories'
import ItemDetail from '../screens/ItemDetail'
import ImageItemSelector from './../screens/ImageItemSelector'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()
const ShopStack = () => {
  return (
    <Stack.Navigator
            screenOptions={(
                ({route}) => {
                    return {
                        header: () => <Header title={
                            route.name === "Home" ?
                                "Bienvenido" 
                            : 
                                route.name === "Products" ?
                                    route.params.name
                                    
                                :
                                    "Observaciones"
                        } />
                    }
                }
            )}
        >
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Products' component={ItemListCategories}/>
            <Stack.Screen name='Detail' component={ItemDetail}/>
            <Stack.Screen name='SelectItemImage' component={ImageItemSelector}/>
        </Stack.Navigator>
  )
}

export default ShopStack
