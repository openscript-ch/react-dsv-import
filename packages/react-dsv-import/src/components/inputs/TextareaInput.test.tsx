import { render, fireEvent } from '@testing-library/react';
import { TextareaInput } from './TextareaInput';
import { ColumnType } from '../../models/column';
import { getDSVImportContext } from '../../features/context';
import { State } from '../../models/state';

describe('TextareaInput', () => {
  type TestType = unknown;
  const columns: ColumnType<TestType>[] = [];
  const state: State<TestType> = { columns };
  const Context = getDSVImportContext<TestType>();

  const dispatchMock = jest.fn(() => state);

  const renderComponent = () => {
    return render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <Context.Provider value={[state, dispatchMock]}>
        <TextareaInput />
      </Context.Provider>
    );
  };

  it('should dispatch the setRaw action on input change', () => {
    const { container } = renderComponent();
    const textarea = container.querySelector('textarea');

    if (textarea) {
      fireEvent.change(textarea, { target: { value: 'Change' } });
    }

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith({ raw: 'Change', type: 'setRaw' });
  });
});
