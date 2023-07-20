import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
import { api } from '@/utils/client/api'
import * as Tabs from '@radix-ui/react-tabs'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root className="TabsRoot pt-10" defaultValue="all">
          <Tabs.List
            className="data-[state=checked] flex gap-2  data-[state=checked]:bg-gray-700"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="data-[state=active] rounded-full px-6 py-3 text-sm focus:border-gray-700 focus:outline-none data-[state=active]:bg-gray-700 data-[state=active]:text-white "
              value="all"
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[state=active] rounded-full  px-6 py-3 text-sm  focus:border-gray-700 focus:outline-none data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              value="pending"
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[state=active] rounded-full px-6 py-3 text-sm  focus:border-gray-700 focus:outline-none data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              value="completed"
            >
              Completed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="all">
            <div className="pt-10">
              <TodoList statuses={['pending', 'completed']} />
            </div>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="pending">
            <div className="pt-10">
              <TodoList statuses={['pending']} />
            </div>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="completed">
            <div className="pt-10">
              <TodoList statuses={['completed']} />
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
