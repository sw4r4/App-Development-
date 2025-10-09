
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addTask = () => {
    if (task.trim() === '') return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask('');
  };

  const editTask = (index: number) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <Button title={editIndex !== null ? 'Update' : 'Add'} onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editTask(index)} style={styles.editBtn}>
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteBtn}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginRight: 10 },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  taskText: { fontSize: 18 },
  buttonContainer: { flexDirection: 'row' },
  editBtn: { backgroundColor: '#4CAF50', padding: 6, borderRadius: 5, marginRight: 5 },
  deleteBtn: { backgroundColor: '#f44336', padding: 6, borderRadius: 5 },
  btnText: { color: 'white', fontWeight: 'bold' },
});

export default App;

