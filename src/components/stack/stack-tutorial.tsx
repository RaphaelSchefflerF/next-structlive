'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

export default function StackTutorial() {
  const { progress, markAsCompleted } = useAppContext();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const sections = [
    {
      title: 'O que é uma Pilha?',
      content: (
        <div className="space-y-4">
          <p>
            Uma pilha é uma estrutura de dados linear que segue o princípio LIFO
            (Last In, First Out), onde o último elemento adicionado à pilha será
            o primeiro a ser removido.
          </p>

          <div className="flex justify-center my-6">
            <div className="border border-dashed p-6 w-[300px] rounded-md">
              <div className="flex flex-col-reverse gap-2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded text-center">
                  Último item (Topo) - Será o primeiro a sair
                </div>
                <div className="bg-muted px-4 py-2 rounded text-center">
                  Item do meio
                </div>
                <div className="bg-muted px-4 py-2 rounded text-center">
                  Primeiro item - Será o último a sair
                </div>
              </div>
            </div>
          </div>

          <p>
            É semelhante a uma pilha de pratos: você coloca um prato em cima do
            outro e, para pegar um prato, você começa pelo que está no topo.
          </p>

          <h3 className="text-lg font-medium mt-6">Características da Pilha</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Segue o princípio LIFO (Last In, First Out)</li>
            <li>Os elementos só podem ser inseridos ou removidos pelo topo</li>
            <li>Pode ser implementada usando arrays ou listas ligadas</li>
            <li>Permite acesso apenas ao elemento que está no topo</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Operações Básicas',
      content: (
        <div className="space-y-4">
          <p>
            Uma pilha possui algumas operações fundamentais que permitem
            manipular seus elementos.
          </p>

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="push">
              <AccordionTrigger>
                <span className="font-medium">Push: Inserir elemento</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    A operação{' '}
                    <code className="bg-muted px-1 py-0.5 rounded">push</code>{' '}
                    adiciona um elemento ao topo da pilha.
                  </p>
                  <div className="py-2 px-4 bg-muted rounded-md">
                    <pre>
                      <code>pilha.push(elemento)</code>
                    </pre>
                  </div>
                  <div className="flex justify-center my-4">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Antes do Push
                        </p>
                        <div className="flex flex-col-reverse gap-2">
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 2
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 1
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Depois do Push
                        </p>
                        <div className="flex flex-col-reverse gap-2">
                          <div className="bg-primary text-primary-foreground px-4 py-2 rounded text-center">
                            Item 3 (Novo)
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 2
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pop">
              <AccordionTrigger>
                <span className="font-medium">Pop: Remover elemento</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    A operação{' '}
                    <code className="bg-muted px-1 py-0.5 rounded">pop</code>{' '}
                    remove e retorna o elemento do topo da pilha.
                  </p>
                  <div className="py-2 px-4 bg-muted rounded-md">
                    <pre>
                      <code>elemento = pilha.pop()</code>
                    </pre>
                  </div>
                  <div className="flex justify-center my-4">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Antes do Pop
                        </p>
                        <div className="flex flex-col-reverse gap-2">
                          <div className="bg-primary text-primary-foreground px-4 py-2 rounded text-center">
                            Item 3
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 2
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 1
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Depois do Pop
                        </p>
                        <div className="flex flex-col-reverse gap-2">
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 2
                          </div>
                          <div className="bg-muted px-4 py-2 rounded text-center">
                            Item 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="peek">
              <AccordionTrigger>
                <span className="font-medium">Peek: Consultar topo</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    A operação{' '}
                    <code className="bg-muted px-1 py-0.5 rounded">peek</code>{' '}
                    (ou top) retorna o elemento do topo da pilha sem removê-lo.
                  </p>
                  <div className="py-2 px-4 bg-muted rounded-md">
                    <pre>
                      <code>elemento = pilha.peek()</code>
                    </pre>
                  </div>
                  <div className="flex justify-center my-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground text-center mb-2">
                        Peek (apenas consulta)
                      </p>
                      <div className="flex flex-col-reverse gap-2">
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded text-center">
                          Item 3 (Visualizado)
                        </div>
                        <div className="bg-muted px-4 py-2 rounded text-center">
                          Item 2
                        </div>
                        <div className="bg-muted px-4 py-2 rounded text-center">
                          Item 1
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="isempty">
              <AccordionTrigger>
                <span className="font-medium">
                  isEmpty: Verificar se está vazia
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    A operação{' '}
                    <code className="bg-muted px-1 py-0.5 rounded">
                      isEmpty
                    </code>{' '}
                    verifica se a pilha está vazia.
                  </p>
                  <div className="py-2 px-4 bg-muted rounded-md">
                    <pre>
                      <code>
                        if (pilha.isEmpty()){' '}
                        {
                          // A pilha está vazia
                        }
                      </code>
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="size">
              <AccordionTrigger>
                <span className="font-medium">Size: Obter tamanho</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    A operação{' '}
                    <code className="bg-muted px-1 py-0.5 rounded">size</code>{' '}
                    retorna o número de elementos na pilha.
                  </p>
                  <div className="py-2 px-4 bg-muted rounded-md">
                    <pre>
                      <code>tamanho = pilha.size()</code>
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      title: 'Complexidade Temporal',
      content: (
        <div className="space-y-4">
          <p>
            Uma das grandes vantagens das pilhas é que todas as operações
            principais têm complexidade de tempo constante (O(1)):
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Push</h3>
              <div className="flex justify-between">
                <span>Complexidade:</span>
                <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 rounded">
                  O(1)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Adicionar um elemento no topo é uma operação de tempo constante.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Pop</h3>
              <div className="flex justify-between">
                <span>Complexidade:</span>
                <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 rounded">
                  O(1)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Remover o elemento do topo também é uma operação de tempo
                constante.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Peek</h3>
              <div className="flex justify-between">
                <span>Complexidade:</span>
                <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 rounded">
                  O(1)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Acessar o elemento do topo sem removê-lo é instantâneo.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">isEmpty / Size</h3>
              <div className="flex justify-between">
                <span>Complexidade:</span>
                <span className="font-mono bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 rounded">
                  O(1)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Verificar se está vazia ou obter o tamanho é feito em tempo
                constante.
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-md mt-4">
            <p className="font-medium">Importante:</p>
            <p className="text-sm text-muted-foreground">
              Esta eficiência constante O(1) é um dos principais motivos pelos
              quais pilhas são amplamente utilizadas em algoritmos e sistemas
              quando precisamos de um comportamento LIFO.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Limitações e Considerações',
      content: (
        <div className="space-y-4">
          <p>
            Embora as pilhas sejam estruturas muito úteis, é importante
            compreender suas limitações:
          </p>

          <div className="mt-4 space-y-4">
            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900/50 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <span className="bg-yellow-200 dark:bg-yellow-900/50 p-1 rounded mr-2">
                  ⚠️
                </span>
                Acesso limitado aos elementos
              </h3>
              <p className="text-sm">
                Em uma pilha, você só pode acessar o elemento do topo. Se você
                precisar acessar elementos do meio, terá que remover todos os
                elementos acima dele primeiro.
              </p>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900/50 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <span className="bg-yellow-200 dark:bg-yellow-900/50 p-1 rounded mr-2">
                  ⚠️
                </span>
                Pilha com tamanho fixo
              </h3>
              <p className="text-sm">
                Se você implementar uma pilha usando um array de tamanho fixo,
                pode enfrentar problemas de estouro de pilha (stack overflow) ao
                tentar adicionar mais elementos do que o tamanho máximo.
              </p>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900/50 rounded-md">
              <h3 className="font-medium mb-2 flex items-center">
                <span className="bg-yellow-200 dark:bg-yellow-900/50 p-1 rounded mr-2">
                  ⚠️
                </span>
                Não suporta busca eficiente
              </h3>
              <p className="text-sm">
                Pilhas não são projetadas para busca de elementos. Se você
                precisar buscar por um valor específico, terá que esvaziar a
                pilha e reconstruí-la.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Quando usar uma pilha?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Quando você precisar de acesso LIFO (último a entrar, primeiro a
                sair)
              </li>
              <li>
                Para rastrear estados (como em algoritmos de backtracking)
              </li>
              <li>Para inversão de dados</li>
              <li>Para verificação de sintaxe (como validar parênteses)</li>
              <li>Para implementar funções de "desfazer" em editores</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const markSectionCompleted = (index: number) => {
    if (!completedSections.includes(index)) {
      setCompletedSections([...completedSections, index]);
    }
  };

  const nextSection = () => {
    markSectionCompleted(currentSection);
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (currentSection === sections.length - 1) {
      // Marca o módulo como concluído quando todas as seções forem completadas
      markAsCompleted('stacks');
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Aprendendo sobre Pilhas</h2>

      <div className="flex gap-2 mb-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium border cursor-pointer transition-colors',
              index === currentSection
                ? 'border-primary bg-primary text-primary-foreground'
                : completedSections.includes(index)
                ? 'border-green-500 text-green-500 bg-green-100 dark:bg-green-950/20'
                : 'border-muted-foreground/20',
            )}
            onClick={() => setCurrentSection(index)}
          >
            {completedSections.includes(index) ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </div>
        ))}
      </div>

      <div className="border rounded-md p-6">
        <h3 className="text-xl font-medium mb-4">
          {sections[currentSection].title}
        </h3>
        <div>{sections[currentSection].content}</div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={previousSection}
          disabled={currentSection === 0}
        >
          Anterior
        </Button>
        <Button onClick={nextSection} className="flex items-center gap-1">
          {currentSection < sections.length - 1 ? (
            <>
              Próximo <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            'Finalizar'
          )}
        </Button>
      </div>

      {completedSections.length === sections.length && (
        <div className="bg-green-100 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-md p-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
          <span>Parabéns! Você completou o tutorial sobre pilhas.</span>
        </div>
      )}
    </div>
  );
}
