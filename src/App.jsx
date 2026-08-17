import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const Cadastro = () => {
    const [tarefas, setTarefas] = useState([])
    const [texto, setTexto] = useState('')

    useEffect(() => {
      const salvas = localStorage.getItem('tarefas')

      if (salvas) {
        setTarefas(JSON.parse(salvas))
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }, [tarefas])

    const adicionar = (e) => {
      e.preventDefault()

      if (!texto.trim()) return

      setTarefas([...tarefas, { texto }])
      setTexto('')
    }

    const remover = (index) => {
      setTarefas(tarefas.filter((_, i) => i !== index))
    }

    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <div className="card shadow border-0">
              <div className="card-body p-4">

                <h2 className="text-center text-primary mb-4">
                  Gerenciador de Tarefas
                </h2>

                <form onSubmit={adicionar}>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite uma nova tarefa..."
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>

                {tarefas.length === 0 ? (
                  <div className="alert alert-light text-center">
                    Nenhuma tarefa cadastrada.
                  </div>
                ) : (
                  <ul className="list-group">
                    {tarefas.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{item.texto}</span>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => remover(index)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return <Cadastro />
}

export default App