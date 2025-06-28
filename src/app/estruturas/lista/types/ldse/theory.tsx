import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LdseTheory() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <div className="border rounded-lg p-6 bg-card">
      <h2 className="text-2xl font-semibold mb-4">
        Lista Dinâmica Simplesmente Encadeada (LDSE)
      </h2>

      <h3 className="text-xl font-medium mt-6 mb-3">1. Introdução</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Listas dinâmicas são estruturas de dados que podem ser redimensionadas
        durante a execução do programa, permitindo adicionar ou remover
        elementos de forma eficiente. Elas são comumente implementadas usando
        arrays redimensionáveis (como o ArrayList em Java ou o vector em C++) ou
        listas encadeadas (como as listas simplesmente ou duplamente
        encadeadas).
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        Como vantagens em relação às listas estáticas, especialmente a lista
        estática sequencial, podese apresentar a flexibilidade no tamanho, pois
        listas dinâmicas podem crescer ou encolher conforme a necessidade,
        evitando desperdício de memória ou restrições no número de elementos.
        Tem-se também inserção e remoção eficientes, por serem encadeadas, pois
        oferecem inserções e remoções eficientes em qualquer posição, enquanto a
        lista estática sequencial é eficiente para inserção e remoção no final
        da lista.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Pode-se falar também em facilidade de uso, visto que listas dinâmicas em
        linguagens de alto nível geralmente oferecem funções prontas para uso
        que simplificam a manipulação da estrutura de dados. São justamente
        estas funções que estamos aprendendo a criar aqui.
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        Como desvantagens temos a sobrecarga de memória (o overhead), pois
        requerem armazenamento adicional para ponteiros de referência entre os
        elementos, e um acesso não tão rápido, visto que o tempo de acesso aos
        elementos em listas encadeadas é geralmente mais lento do que em arrays,
        pois não há o acesso indexado, o que requer percorrer a lista até o
        elemento desejado. Acrescente-se que sua implementação pode ser mais
        complexa do que listas estáticas.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <h4 className="font-medium text-blue-800 mb-2">Definição</h4>
        <p className="text-blue-700 text-sm">
          Uma Lista Dinâmica Simplesmente Encadeada (LDSE) é uma estrutura de
          dados linear, homogênea e dinâmica, onde cada elemento (nó) possui um
          campo de informação e um campo de ligação que aponta para o próximo
          elemento da sequência.
        </p>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">
        1.1 Conceitos Fundamentais
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        A LDSE possui algumas características distintivas que a diferenciam de
        outras estruturas:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li>
          <strong>Acesso sequencial:</strong> Para acessar um elemento
          específico, é necessário percorrer a lista desde o início
        </li>
        <li>
          <strong>Tamanho variável:</strong> O número de elementos pode aumentar
          ou diminuir durante a execução
        </li>
        <li>
          <strong>Alocação dinâmica:</strong> Cada nó é alocado individualmente
          na memória
        </li>
        <li>
          <strong>Ligação unidirecional:</strong> Cada nó conhece apenas seu
          sucessor, não seu predecessor
        </li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3">2. Estrutura do Nó</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Cada elemento (nó) da lista é composto por dois campos fundamentais:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
        <li>
          <strong>Campo de informação:</strong> armazena o dado útil do elemento
        </li>
        <li>
          <strong>Campo de ligação (ponteiro):</strong> contém o endereço do
          próximo nó da lista
        </li>
      </ul>

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <h4 className="text-lg font-medium mb-2">Representação Gráfica</h4>
        <div className="font-mono text-sm bg-background p-3 rounded border">
          <div className="text-center mb-2">
            <Image
              src="/assets/exemple1.png"
              alt="Representação Gráfica da LDSE"
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        O último nó da lista possui o campo de ligação apontando para None,
        indicando o fim da estrutura. Quando a lista está vazia, o ponteiro
        inicial (cabeça da lista) também aponta para None.
      </p>

      <h3 className="text-xl font-medium mt-6 mb-3">
        3. Características da Lista Dinâmica
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-4">
        Uma Lista Dinâmica Simplesmente Encadeada apresenta quatro
        características fundamentais que a definem como estrutura de dados:
      </p>

      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            3.1 Estrutura Linear
          </h4>
          <p className="text-blue-700 text-sm mb-2">
            Os elementos estão organizados em uma sequência onde existe uma
            relação de ordem entre eles. Cada elemento tem no máximo um
            predecessor e no máximo um sucessor.
          </p>
          <p className="text-blue-700 text-sm">
            <strong>Características:</strong>
          </p>
          <ul className="list-disc pl-4 text-blue-700 text-sm">
            <li>Existe um primeiro elemento (sem predecessor)</li>
            <li>Existe um último elemento (sem sucessor)</li>
            <li>
              Todos os demais elementos têm exatamente um predecessor e um
              sucessor
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <h4 className="font-medium text-green-800 mb-2">
            3.2 Estrutura Homogênea
          </h4>
          <p className="text-green-700 text-sm">
            Todos os elementos da lista são do mesmo tipo de dados, garantindo
            uniformidade no tratamento das informações armazenadas. Esta
            característica permite que as operações sejam aplicadas de forma
            consistente a qualquer elemento da lista.
          </p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h4 className="font-medium text-purple-800 mb-2">
            3.3 Estrutura Dinâmica
          </h4>
          <p className="text-purple-700 text-sm mb-2">
            O número de elementos pode variar durante a execução do programa.
            Esta é a principal vantagem sobre arranjos estáticos.
          </p>
          <p className="text-purple-700 text-sm">
            <strong>Implicações:</strong>
          </p>
          <ul className="list-disc pl-4 text-purple-700 text-sm">
            <li>Não há necessidade de declarar tamanho máximo previamente</li>
            <li>A lista cresce e diminui conforme necessário</li>
            <li>Limitada apenas pela memória disponível do sistema</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
          <h4 className="font-medium text-orange-800 mb-2">
            3.4 Ligação Simples
          </h4>
          <p className="text-orange-700 text-sm mb-2">
            Cada nó possui apenas um ponteiro que aponta para o próximo elemento
            da lista, permitindo percorrimento em apenas uma direção
            (unidirecional).
          </p>
          <p className="text-orange-700 text-sm">
            <strong>Consequências:</strong>
          </p>
          <ul className="list-disc pl-4 text-orange-700 text-sm">
            <li>Navegação apenas do início para o fim</li>
            <li>
              Para acessar um elemento anterior, é necessário percorrer desde o
              início
            </li>
            <li>
              Menor uso de memória comparado a listas duplamente encadeadas
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <h4 className="font-medium text-yellow-800 mb-2">
          Característica Distintiva
        </h4>
        <p className="text-yellow-700 text-sm">
          A característica mais importante de uma LDSE é que ela combina a
          flexibilidade de tamanhos dinâmicos com a simplicidade de uma ligação
          unidirecional, tornando-a ideal para aplicações onde o acesso
          sequencial é predominante.
        </p>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">
        4. Terminologia e Conceitos
      </h3>
      <div className="space-y-3 mb-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">Nó (Node):</span> Unidade básica da
            lista, contendo um campo de informação e um campo de ligação
            (ponteiro).
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-3">
          <p className="text-green-800 text-sm">
            <span className="font-semibold">Cabeça da Lista (Head):</span>{' '}
            Ponteiro que referencia o primeiro nó da lista. Em uma lista vazia,
            aponta para None.
          </p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-3">
          <p className="text-purple-800 text-sm">
            <span className="font-semibold">Encadeamento:</span> Ligação entre
            nós através de ponteiros, formando a cadeia que constitui a lista.
          </p>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
          <p className="text-orange-800 text-sm">
            <span className="font-semibold">None:</span> Valor especial que
            indica fim da lista ou ausência de nó (lista vazia).
          </p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-400 p-3">
          <p className="text-red-800 text-sm">
            <span className="font-semibold">Campo de Informação:</span> Parte do
            nó que armazena o dado útil do elemento.
          </p>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3">
          <p className="text-indigo-800 text-sm">
            <span className="font-semibold">Campo de Ligação:</span> Ponteiro
            que contém o endereço do próximo nó na sequência.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">Estrutura do Nó</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Cada nó da LDSE é composto por dois campos fundamentais:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li>
          <span className="font-medium text-foreground">
            Campo de dados (info):
          </span>{' '}
          armazena a informação útil do nó
        </li>
        <li>
          <span className="font-medium text-foreground">
            Campo de ligação (prox):
          </span>{' '}
          contém o endereço do próximo nó da lista
        </li>
      </ul>

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <h4 className="text-lg font-medium mb-2">Declaração em Python</h4>
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`class No:
    def __init__(self, info):
        self.info = info    # campo de informação
        self.prox = None    # ponteiro para o próximo nó

class Lista:
    def __init__(self):
        self.inicio = None  # ponteiro para o primeiro nó da lista`}
        </pre>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <h4 className="text-lg font-medium mb-2">Representação Visual</h4>
        <div className="font-mono text-sm bg-background p-3 rounded border">
          <Image
            src="/assets/exemple2.png"
            alt="Representação Gráfica da LDSE"
            width={400}
            height={200}
          />
        </div>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">Operações Fundamentais</h3>

      <h4 className="text-lg font-medium mb-3">1. Criar Lista Vazia</h4>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Inicializa uma lista vazia, definindo o ponteiro de início como None.
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def cria_lista():
    return None  # lista vazia`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">2. Inserção no Início</h4>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Adiciona um novo nó no começo da lista. Esta operação tem complexidade
        O(1).
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def insere_inicio(lista, valor):
    novo = No(valor)
    novo.prox = lista
    return novo`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">3. Inserção no Final</h4>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Adiciona um novo nó no final da lista. Esta operação tem complexidade
        O(n).
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def insere_final(lista, valor):
    novo = No(valor)
    novo.prox = None

    if lista is None:
        return novo

    aux = lista
    while aux.prox is not None:
        aux = aux.prox

    aux.prox = novo
    return lista`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">4. Remoção por Valor</h4>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Remove o primeiro nó que contém o valor especificado.
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def remove_valor(lista, valor):
    if lista is None:
        return None  # lista vazia

    # Se o elemento a ser removido é o primeiro
    if lista.info == valor:
        temp = lista.prox
        del lista
        return temp

    # Procura o elemento na lista
    ant = lista
    p = lista.prox

    while p is not None and p.info != valor:
        ant = p
        p = p.prox

    # Se encontrou o elemento
    if p is not None:
        ant.prox = p.prox
        del p

    return lista`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">5. Busca</h4>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Procura por um valor específico na lista e retorna o nó correspondente.
      </p>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def busca(lista, valor):
    p = lista
    while p is not None:
        if p.info == valor:
            return p  # encontrou
        p = p.prox
    return None  # não encontrou`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">6. Verificar Lista Vazia</h4>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def lista_vazia(lista):
    return lista is None`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">7. Imprimir Lista</h4>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`def imprime(lista):
    p = lista
    print("Lista: ", end="")
    while p is not None:
        print(p.info, end=" ")
        p = p.prox
    print()`}
        </pre>
      </div>

      <h4 className="text-lg font-medium mb-3">8. Liberar Memória</h4>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <pre className="bg-background p-3 rounded border font-mono text-sm overflow-x-auto">
          {`# Em Python, o garbage collector cuida da liberação de memória
# mas podemos implementar uma função similar para ilustração
def libera_lista(lista):
    p = lista
    while p is not None:
        t = p.prox
        # Em Python não precisamos chamar free() explicitamente
        # Remover a referência é suficiente
        p = None
        p = t`}
        </pre>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">
        Complexidade das Operações
      </h3>
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">
              Operações de Consulta
            </h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Busca:</span> O(n)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Acesso por posição:
                </span>{' '}
                O(n)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Verificar vazia:
                </span>{' '}
                O(1)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">
              Operações de Modificação
            </h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Inserção no início:
                </span>{' '}
                O(1)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Inserção no final:
                </span>{' '}
                O(n)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Remoção no início:
                </span>{' '}
                O(1)
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Remoção por valor:
                </span>{' '}
                O(n)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-3">Vantagens</h3>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li>
          <span className="font-medium text-foreground">Tamanho dinâmico:</span>{' '}
          Pode crescer e diminuir durante a execução
        </li>
        <li>
          <span className="font-medium text-foreground">
            Uso eficiente de memória:
          </span>{' '}
          Aloca apenas o espaço necessário
        </li>
        <li>
          <span className="font-medium text-foreground">
            Inserção/remoção eficiente no início:
          </span>{' '}
          Operações O(1)
        </li>
        <li>
          <span className="font-medium text-foreground">Flexibilidade:</span>{' '}
          Facilita implementação de outras estruturas
        </li>
        <li>
          <span className="font-medium text-foreground">
            Sem limitação prévia de tamanho:
          </span>{' '}
          Limitado apenas pela memória disponível
        </li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3">Desvantagens</h3>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li>
          <span className="font-medium text-foreground">
            Acesso sequencial:
          </span>{' '}
          Não permite acesso direto aos elementos
        </li>
        <li>
          <span className="font-medium text-foreground">
            Overhead de memória:
          </span>{' '}
          Espaço adicional para armazenar ponteiros
        </li>
        <li>
          <span className="font-medium text-foreground">
            Navegação unidirecional:
          </span>{' '}
          Não é possível retroceder facilmente
        </li>
        <li>
          <span className="font-medium text-foreground">
            Localidade de cache ruim:
          </span>{' '}
          Elementos podem estar dispersos na memória
        </li>
        <li>
          <span className="font-medium text-foreground">
            Maior complexidade:
          </span>{' '}
          Gerenciamento de ponteiros aumenta a complexidade
        </li>
      </ul>

      <h3 className="text-xl font-medium mt-6 mb-3">Aplicações</h3>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>
          <span className="font-medium text-foreground">
            Implementação de pilhas e filas:
          </span>{' '}
          Base para outras estruturas de dados
        </li>
        <li>
          <span className="font-medium text-foreground">
            Sistemas de histórico:
          </span>{' '}
          Undo/redo em editores de texto
        </li>
        <li>
          <span className="font-medium text-foreground">
            Representação de polinômios:
          </span>{' '}
          Em sistemas de álgebra computacional
        </li>
        <li>
          <span className="font-medium text-foreground">
            Listas de adjacência:
          </span>{' '}
          Em representação de grafos
        </li>
        <li>
          <span className="font-medium text-foreground">
            Gerenciamento de memória livre:
          </span>{' '}
          Em sistemas operacionais
        </li>
      </ul>
    </div>
  );
}
