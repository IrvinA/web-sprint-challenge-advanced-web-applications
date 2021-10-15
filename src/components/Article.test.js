import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render } from 'react-dom';
import { click } from '@testing-library/user-event/dist/click';

const testArticle = {
    id: nanoid(5),
    headline: "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
    createdOn: moment().subtract(Math.random()*10, "days").format(),
    author:"",
    image: 134,
    summary: "Triple-digit temperatures led to a spike in demand across the region.",
    body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home."   
}

test('renders component without errors', ()=> {
    render(<Article />)
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>);
    let headline = screen.queryByTestId('headline');
    let author = screen.queryByTestId('author');
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle}/>);
    let author = screen.queryByTestId('author');
    expect(author).toHaveDisplayValue(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const mockOnClick = jest.fn();
    render(<Article article={testArticle} handleDelete={mockOnClick}/>);
    let button = screen.queryByTestId('deleteButton');
    button.simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);
});