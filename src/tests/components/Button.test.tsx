import { render } from '@testing-library/react';
import { Button } from '../../components/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const { getByText, rerender, debug } = render(
      <Button 
        title='mocked-title' 
        iconName='action' 
        selected={true} 
      />
    );

    debug();

    let selectedButton;

    selectedButton = document.querySelector('.selected');

    expect(getByText('mocked-title')).toBeInTheDocument();
    expect(selectedButton).toBeInTheDocument();

    rerender(
      <Button
        title='mocked-title' 
        iconName='action' 
        selected={false} 
      />
    );

    selectedButton = document.querySelector('.selected');
    
    expect(selectedButton).not.toBeInTheDocument();
  });
});