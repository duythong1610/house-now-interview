import type { SVGProps } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

/**
 * QUESTION 3:
 * -----------
 * A todo has 2 statuses: "pending" and "completed"
 *  - "pending" state is represented by an unchecked checkbox
 *  - "completed" state is represented by a checked checkbox, darker background,
 *    and a line-through text
 *
 * We have 2 backend apis:
 *  - (1) `api.todo.getAll`       -> a query to get all todos
 *  - (2) `api.todoStatus.update` -> a mutation to update a todo's status
 *
 * Example usage for (1) is right below inside the TodoList component. For (2),
 * you can find similar usage (`api.todo.create`) in src/client/components/CreateTodoForm.tsx
 *
 * If you use VSCode as your editor , you should have intellisense for the apis'
 * input. If not, you can find their signatures in:
 *  - (1) src/server/api/routers/todo-router.ts
 *  - (2) src/server/api/routers/todo-status-router.ts
 *
 * Your tasks are:
 *  - Use TRPC to connect the todos' statuses to the backend apis
 *  - Style each todo item to reflect its status base on the design on Figma
 *
 * Documentation references:
 *  - https://trpc.io/docs/client/react/useQuery
 *  - https://trpc.io/docs/client/react/useMutation
 *
 *
 *
 *
 *
 * QUESTION 4:
 * -----------
 * Implement UI to delete a todo. The UI should look like the design on Figma
 *
 * The backend api to delete a todo is `api.todo.delete`. You can find the api
 * signature in src/server/api/routers/todo-router.ts
 *
 * NOTES:
 *  - Use the XMarkIcon component below for the delete icon button. Note that
 *  the icon button should be accessible
 *  - deleted todo should be removed from the UI without page refresh
 *
 * Documentation references:
 *  - https://www.sarasoueidan.com/blog/accessible-icon-buttons
 *
 *
 *
 *
 *
 * QUESTION 5:
 * -----------
 * Animate your todo list using @formkit/auto-animate package
 *
 * Documentation references:
 *  - https://auto-animate.formkit.com
 */

interface TodoListProps {
  statuses: any[]
}
export const TodoList: React.FC<TodoListProps> = ({ statuses }) => {
  const [parent] = useAutoAnimate()

  const { data: todos = [] } = api.todo.getAll.useQuery({
    statuses,
  })

  const apiContext = api.useContext()

  const { mutate: deleteTodo, isSuccess: isDeleteSuccess } =
    api.todo.delete.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
    })

  const { mutate: updateTodo } = api.todoStatus.update.useMutation({
    onSuccess: () => {
      apiContext.todo.getAll.refetch()
    },
  })

  return (
    <>
      {todos.length > 0 ? (
        <ul className="grid grid-cols-1 gap-y-3" ref={parent}>
          {todos.map((todo) => (
            <Dialog.Root>
              <li key={todo.id}>
                <div className="flex items-center justify-between rounded-12 border border-gray-200 px-4 py-3 shadow-sm">
                  <div className="flex items-center">
                    <Checkbox.Root
                      checked={todo.status === 'completed'}
                      onCheckedChange={() =>
                        updateTodo({
                          status:
                            todo.status === 'pending' ? 'completed' : 'pending',
                          todoId: todo.id,
                        })
                      }
                      id={String(todo.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
                    >
                      <Checkbox.Indicator>
                        <CheckIcon className="h-4 w-4 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>

                    <label
                      className={`${
                        todo.status === 'completed'
                          ? 'block pl-3 font-medium line-through'
                          : 'block pl-3 font-medium'
                      } `}
                      htmlFor={String(todo.id)}
                    >
                      {todo.body}
                    </label>
                  </div>
                  <Dialog.Trigger asChild>
                    <button
                      className="cursor-pointer"
                      onClick={() => console.log(todo)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-[#00000070]" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vh] max-w-[450px] -translate-x-[50%] -translate-y-[50%] rounded-12 bg-white p-6">
                      <Dialog.Title className="text-center text-2xl font-medium text-gray-700">
                        Delete Todo
                      </Dialog.Title>
                      <Dialog.Description className="mt-5 text-center text-lg">
                        Are you sure you want to delete{' '}
                        <span className="font-bold">{todo.body}</span>?
                      </Dialog.Description>

                      <div className="mt-5 flex items-center justify-center gap-4">
                        <Dialog.Close asChild>
                          <button
                            className="Button green w-1/2 rounded-12 bg-gray-700 px-4 py-2 text-white"
                            onClick={() => deleteTodo({ id: Number(todo.id) })}
                          >
                            Confirm
                          </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <button
                            className="IconButton w-1/2 rounded-12 border-[2px] border-gray-700 px-4 py-2"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </div>
              </li>
            </Dialog.Root>
          ))}
        </ul>
      ) : (
        <h1 className="text-center font-medium">Not found</h1>
      )}
    </>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
