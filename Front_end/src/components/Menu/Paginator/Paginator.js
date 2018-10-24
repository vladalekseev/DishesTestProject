import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './Paginator.scss';

@inject('menuStore')
@observer
class Paginator extends Component {

    render() {
        const { menuStore } = this.props;
        const currentPage = parseInt(menuStore.currentPage, 10);
        const pages = menuStore.pages;

        return(
            <div className='container'>
                <div className="paginator">
                    <ul className="paginator__list">
                        {
                            pages.map((page, i) => {
                                const index = i + 1;
                                return (
                                    <li
                                        key={i}
                                        className={cn('paginator__item', { 'paginator__item--active': currentPage === index })}
                                    >
                                        <Link to={`/page${index}`}>{index}</Link>
                                    </li>
                                    )
                            })
                        }
                        <li className={cn('paginator__item', { 'd-none': currentPage >= pages.length })}>
                            <Link to={`/page${currentPage + 1}`}>
                                <i className="fa fa-chevron-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Paginator;
