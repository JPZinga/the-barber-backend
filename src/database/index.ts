
import mongoose from 'mongoose';

export default {
  async connect(){
    try {
      await mongoose.connect(
        'mongodb+srv://jpzinga:thebarber@the-barber-cluster.8rr71.mongodb.net/dbTheBarber?retryWrites=true&w=majority', 
        { useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
        console.error(`Conexão com o banco de dados efectuada com sucesso!`)
      });
    }
    catch (e) { console.error(`Erro ao conectar ao Banco de dados:\n ${e}`)}
  }
}
