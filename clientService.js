const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'suaChaveSecreta';

// Dados iniciais
let clientes = [
  { id: 1, codigo: '20241', nome: 'Carlos' },
  { id: 2, codigo: '20242', nome: 'Lucas' },
  { id: 3, codigo: '20243', nome: 'Calleri' }
];

let enderecos = [
  { id: 1, clienteId: 1, indice: 1, logradouro: 'Rua A', numero: '10', complemento: '', cidade: 'Barueri', estado: 'Sao Paulo', cep: '12345-678' },
  { id: 2, clienteId: 2, indice: 2, logradouro: 'Rua B', numero: '11', complemento: 'Apto 1', cidade: 'Carapicuiba', estado: 'Rio de janeiro', cep: '98765-432' },
  { id: 3, clienteId: 3, indice: 3, logradouro: 'Rua C', numero: '12', complemento: '', cidade: 'Cidade C', estado: 'Sao Paulo', cep: '54321-876' }
];

// Middleware para fazer o parsing do corpo das requisições para JSON
app.use(express.json());

// Autenticação
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'usuario' && password === 'senha') {
    // Criação do token JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rota para criar um novo cliente (protegida)
app.post('/api/v1/cliente', authenticateToken, (req, res) => {
  const novoCliente = req.body;
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// Rota para obter um cliente específico pelo código
app.get('/api/v1/cliente/:codigo', authenticateToken, (req, res) => {
  const codigo = req.params.codigo;
  const cliente = clientes.find(cliente => cliente.codigo === codigo);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Rota para obter todos os clientes
app.get('/api/v1/cliente', authenticateToken, (req, res) => {
  res.json(clientes);
});

// Rota para adicionar um endereço a um cliente específico pelo código (protegida)
app.post('/api/v1/cliente/:codigo/endereco', authenticateToken, (req, res) => {
  const codigo = req.params.codigo;
  const cliente = clientes.find(cliente => cliente.codigo === codigo);
  if (cliente) {
    const novoEndereco = req.body;
    novoEndereco.clienteId = cliente.id;
    enderecos.push(novoEndereco);
    res.status(201).json(novoEndereco);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Rota para obter o endereço de um cliente específico pelo código
app.get('/api/v1/cliente/:codigo/endereco', authenticateToken, (req, res) => {
  const codigo = req.params.codigo;
  const cliente = clientes.find(cliente => cliente.codigo === codigo);
  if (cliente) {
    const endereco = enderecos.find(endereco => endereco.clienteId === cliente.id);
    if (endereco) {
      res.json(endereco);
    } else {
      res.status(404).json({ error: 'Endereço não encontrado para este cliente' });
    }
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Rota para alterar o estado do endereço de um cliente específico pelo código do cliente (protegida)
app.put('/api/v1/cliente/:codigo/endereco/estado', authenticateToken, (req, res) => {
  const codigo = req.params.codigo;
  const novoEstado = req.body.estado;

  // Procurando o cliente pelo código
  const cliente = clientes.find(cliente => cliente.codigo === codigo);
  if (cliente) {
    // Procurando o endereço do cliente
    const endereco = enderecos.find(endereco => endereco.clienteId === cliente.id);
    if (endereco) {
      // Atualizando o estado do endereço
      endereco.estado = novoEstado;
      res.json(endereco); // Retorna o endereço atualizado
    } else {
      res.status(404).json({ error: 'Endereço não encontrado para este cliente' });
    }
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});