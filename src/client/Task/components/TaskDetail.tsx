import React from 'react';
import { RootState, RootAction } from 'client/index';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import fetchTask from 'client/Task/actions/fetchTask';
import fetchComplete from 'client/Task/actions/fetchComplete';
import fetchDelete from 'client/Task/actions/fetchDelete';
import fetchCreate from 'client/Task/actions/fetchCreate';
import fetchUpdate from 'client/Task/actions/fetchUpdate';
import setName from 'client/Task/actions/setName';
import setDescription from 'client/Task/actions/setDescription';
import setDateDue from 'client/Task/actions/setDateDue';
import { Container, Section } from 'client/UI/components/Layout';
import * as UI from './UI';
import TextField from '@material-ui/core/TextField';

const TaskDetail: React.FC = () => {
  const task = useSelector((state: RootState) => state.taskEdit.task);
  const isFetchingTask = useSelector((state: RootState) => state.taskEdit.isFetchingTask);
  const fetchingTaskError = useSelector((state: RootState) => state.taskEdit.fetchTaskError);
  const isEditing = useSelector((state: RootState) => state.taskEdit.isEditing);
  const location = useSelector((state: RootState) => state.router.location);

  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('Task');
  const [touchedName, setTouchedName] = React.useState(false);
  const [touchedDescription, setTouchedDescription] = React.useState(false);
  const [touchedDate, setTouchedDate] = React.useState(false);

  let input: HTMLInputElement | null = null;

  React.useEffect(() => {
    if (!task && !isFetchingTask) {
      loadTask();
    }

    setTitle(`${isEditing ? 'Edit' : 'New'} Task`);
    input && input.focus();
  }, []);

  const loadTask = async (): Promise<void> => {
    const { pathname } = location;
    const taskId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    if (taskId) {
      await dispatch(fetchTask(taskId));
    }
  };

  const completeTask = async (): Promise<void> => {
    if (!(task && task.id)) { return; }
    await dispatch(fetchComplete(task.id));
    dispatch(push('/tasks'));
  };

  const deleteTask = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    if (!(task && task.id)) { return; }
    await dispatch(fetchDelete(task.id));
    dispatch(push('/tasks'));
  };

  const createTask = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    await dispatch(fetchCreate(task.name, task.description, task.dueDate));
    dispatch(push(`/tasks`));
  };

  const updateTask = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    if (!(task && task.id)) { return; }
    await dispatch(fetchUpdate(task.id, task.name, task.description, task.dueDate));
    dispatch(push(`/tasks`));
  };

  const isDisabled = (): boolean => {
    return !(touchedName || touchedDescription || touchedDate);
  };

  return (
    <Container>
      <UI.Title>{title}</UI.Title>
      {isEditing &&
        <UI.ControlWrapper>
          <UI.Btn
            variant="tertiary"
            disabled={false}
            onClick={deleteTask}
          >
            Delete
          </UI.Btn>
          <UI.Btn
            variant="primary"
            disabled={false}
            onClick={completeTask}
          >
            Complete
          </UI.Btn>
        </UI.ControlWrapper>
      }
      <Section>
        <UI.Form
          name="form-task"
          onSubmit={(e: React.FormEvent) => {
            createTask(e);
          }}
        >
          <UI.FormFields>
            <UI.NameAndDateWrapper>
              <UI.NameWrapper>
                <UI.InputLabel>Name</UI.InputLabel>
                <UI.TextInput
                  ref={(ref) => { if (ref) { input = ref; } }}
                  name="name"
                  type="text"
                  onBlur={() => setTouchedName(true)}
                  value={task.name}
                  onChange={(e) => {
                    dispatch(setName(e.target.value));
                    setTouchedName(true);
                  }}
                  placeholder="What do you need to do?"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
              </UI.NameWrapper>
              <UI.DateWrapper>
                <TextField
                  id="date"
                  label="Due Date"
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => {
                    dispatch(setDateDue(e.target.value));
                    setTouchedDate(true);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </UI.DateWrapper>
            </UI.NameAndDateWrapper>
            <UI.TextInputWrapper>
              <UI.InputLabel>Description</UI.InputLabel>
              <UI.TextArea
                name="description"
                onBlur={() => setTouchedDescription(true)}
                value={task.description}
                onChange={(e) => {
                  dispatch(setDescription(e.target.value));
                  setTouchedDescription(true);
                }}
                placeholder="What all does that entail?"
                autoCorrect="off"
                autoCapitalize="none"
              />
            </UI.TextInputWrapper>
          </UI.FormFields>
          <UI.BtnWrapper>
            {!isEditing &&
            <>
              <UI.Btn
                variant="secondary"
                type="button"
                disabled={false}
                onClick={() => dispatch(push('/tasks'))}
              >
                Cancel
              </UI.Btn>
              <UI.Btn
                variant="primary"
                type="submit"
                disabled={isDisabled()}
                onClick={createTask}
              >
                Create
              </UI.Btn>
            </>
          }
          {isEditing &&
            <>
              <UI.Btn
                variant="secondary"
                type="button"
                disabled={false}
                onClick={() => dispatch(push('/tasks'))}
              >
                Cancel
              </UI.Btn>
              <UI.Btn
                variant="primary"
                disabled={isDisabled()}
                onClick={updateTask}
              >
                Save
              </UI.Btn>
            </>
          }
          </UI.BtnWrapper>
        </UI.Form>
      </Section>
    </Container>
  );
};

export default TaskDetail;
