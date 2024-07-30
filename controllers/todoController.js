import Todo from "../model/todoModel.js";

class todoController{
    static createtodo = async (req,res) =>{
        const {title,description} = req.body
        try{
            const result =  await Todo.create({
                title:title,description:description,user:req.user._id
            });
            res.status(200).json({ data: result, success: true });
        }
    catch(error){
        console.log("error", error);
        return res.json({ message: error, success: false });
    }
}
static gettodo = async (req,res)=>{
    try{
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json({ data: todos, success: true });
    }
    catch(error){
        console.log("error", error);
        return res.json({ message: error, success: false });
    }
}
static deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found or not authorized", success: false });
      }
      res.status(200).json({ message: "Todo deleted successfully", success: true });
    } catch (error) {
      console.log("error", error);
      return res.json({ message: error, success: false });
    }
  }

  static updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const todo = await Todo.findOneAndUpdate(
        { _id: id, user: req.user._id },
        { title, description },
        { new: true, runValidators: true }
      );
      if (!todo) {
        return res.status(404).json({ message: "Todo not found or not authorized", success: false });
      }
      res.status(200).json({ data: todo, success: true });
    } catch (error) {
      console.log("error", error);
      return res.json({ message: error, success: false });
    }
  }
}

export default todoController