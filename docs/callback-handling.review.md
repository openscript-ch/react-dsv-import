For learning purposes I refactored a component into it's own NPM package. So it becomes reusable and the idea of React is fulfilled. You can find the NPM package here: https://github.com/openscript/react-dsv-import

When I tried to use the component I ran into a problem:

    Cannot update a component (`SomeComponent`) while rendering a different component (`DSVImport$1`). To locate the bad setState() call inside `DSVImport$1`, follow the stack trace as described in https://fb.me/setstate-in-render

The problem is that my `DSVImport` component, which I split into its own NPM package, uses a context and if the data within this context changes the `onChange` callback is triggered. If the user of the `DSVImport` component sets another state within the callback, the error stated above arises.

The good news is, that I could fix the problem, but I would like you to review my [fix](https://github.com/openscript/react-dsv-import/commit/5ddb0daad7984123b2e51d7d96471c365d1957ed).

Before I was calling the `onChange` callback during the context update in the middleware:

    export const createSimpleParserMiddleware = <T>(onChange?: (value: T[]) => void) => {
      return (state: State<T>, action: Actions<T>) => {
        let newState = reducer<T>(state, action);
    
        if (action.type === 'setRaw') {
          const delimiter = detectDelimiterFromValue(action.raw);
          const parsed = parseData<T>(action.raw, state.columns, delimiter);
          if (onChange) {
            onChange(parsed);
          }
          newState = reducer<T>(state, { type: 'setParsed', parsed });
        }
    
        return newState;
      };
    };

I've removed all this stuff and created a context consumer component, which calls the `onChange` callback within an `effect` (`useEffect`):


    interface EventListenerProps<T> {
      onChange?: (value: T[]) => void;
    }
    
    const EventListener = <T extends { [key: string]: string }>(props: EventListenerProps<T>) => {
      const [context] = useDSVImport<T>();
    
      useEffect(() => {
        if (context.parsed && props.onChange) {
          props.onChange(context.parsed);
        }
      });
    
      return null;
    };
    
    export interface Props<T> {
      onChange?: (value: T[]) => void;
      columns: ColumnsType<T>;
    }
    
    export const DSVImport = <T extends { [key: string]: string }>(props: PropsWithChildren<Props<T>>) => {
      const DSVImportContext = getDSVImportContext<T>();
      const middleware = createSimpleParserMiddleware<T>();
      const initialValues: State<T> = { columns: props.columns };
    
      return (
        <DSVImportContext.Provider value={useReducer(middleware, initialValues)}>
          <EventListener<T> onChange={props.onChange} />
          {props.children}
        </DSVImportContext.Provider>
      );
    };


What do you think about this?