import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, editItem, deleteItem, resetEditingItem } from './actions';

function AppContainer() {
  const items = useSelector((state) => state.items);
  const editingItemId = useSelector((state) => state.editingItem);
  const dispatch = useDispatch();
  const [editingItemData, setEditingItemData] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [costInput, setCostInput] = useState(''); 
  const [filter, setFilter] = useState('');


  const handleAddItem = () => {
    if (nameInput && costInput) {
      dispatch(addItem(nameInput, Number(costInput)));
      setNameInput('');
      setCostInput('');
    }
  };

  const handleEditItem = (id) => {
    const editedItem = items.find((item) => item.id === id);
    if (editedItem) {
      setEditingItemData(editedItem);
      setNameInput(editedItem.name);
      setCostInput(editedItem.cost.toString());
      dispatch({ type: 'SET_EDITING_ITEM', payload: editedItem.id });
    }
  };
  
  

  const handleSaveEdit = () => {
    if (editingItemData && nameInput && costInput) {
      const updatedItem = {
        id: editingItemData.id,
        name: nameInput,
        cost: Number(costInput),
      };
  
      dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
  
      setEditingItemData(null);
      setNameInput('');
      setCostInput('');

      dispatch(resetEditingItem());
    }
  };
  

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <h1>Список элементов</h1>
      <input
        type="text"
        placeholder="Фильтр по наименованию"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {items
          .filter((item) => item.name.includes(filter))
          .map((item) => (
            <li key={item.id}>
              {item.name} - {item.cost}
              <button onClick={() => handleEditItem(item.id)}>Редактировать</button>
              <button onClick={() => handleDeleteItem(item.id)}>Удалить</button>
            </li>
          ))}
      </ul>
      {editingItemId === null ? (
        <div>
          <h2>Добавить элемент</h2>
          <input
            type="text"
            placeholder="Наименование"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="input-field" 
          />
          <input
            type="number"
            placeholder="Стоимость"
            value={costInput}
            onChange={(e) => setCostInput(e.target.value)}
            className="input-field-price" 
          />
          <button onClick={handleAddItem}>Сохранить</button>
        </div>
      ) : (
        <div>
          <h2>Редактировать элемент</h2>
          <input
            type="text"
            placeholder="Наименование"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="input-field" 
          />
          <input
            type="number"
            placeholder="Стоимость"
            value={costInput}
            onChange={(e) => setCostInput(e.target.value)}
            className="input-field-price" 
          />
          <button onClick={handleSaveEdit}>Сохранить</button>
          <button onClick={() => setEditingItemData(null)}>Отмена</button>
        </div>
      )}
    </div>
  );
}

export default AppContainer;