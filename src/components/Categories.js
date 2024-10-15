import { FlatList, StyleSheet } from 'react-native';
import Category from './Category';
import LoadingSpinner from './LoadingSpinner';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../services/users';

const Categories = () => {
  const localId = useSelector(state => state.auth.localId);
  const { data: categories, isLoading } = useGetCategoriesQuery(localId);

  if (isLoading) return <LoadingSpinner />;

  // Convertir el objeto de categorías a un array
  const categoriesArray = categories ? Object.entries(categories).map(([id, category]) => ({ id, localId, ...category })) : [];

  return (
    <FlatList
      data={categoriesArray}
      keyExtractor={item => item.id} // Usar el ID de la categoría como key
      renderItem={({ item }) => <Category item={item} />} // Pasar el objeto completo a Category
    />
  );
};

export default Categories;

const styles = StyleSheet.create({});
