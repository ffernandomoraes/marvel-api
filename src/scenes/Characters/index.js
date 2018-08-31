import React from 'react';
import { API_MAP, params } from 'helpers';
import axios from 'axios';
import './index.css';

class Characters extends React.PureComponent {
   constructor(props) {
      super(props);

      this.state = {
         loading: true,
         error: false,

         characters: [],
         totalCharacters: null,

         current_page: 1,

         filters: {
            nameStartsWith: null,
            orderBy: 'name',
            limit: 15,
            offset: 0,
         },
      };
   }

   handleChangeSearch = (event) => {
      let newState = this.state;
      newState.filters.nameStartsWith = event.target.value;

      if (event.target.value === '') {
         newState.filters.nameStartsWith = null;
      }

      this.setState({
         newState
      });
   }

   handlePressEnter = (e) => {
      if (e.key === 'Enter') {
         let newState = this.state;

         newState.filters.offset = 0;
         newState.current_page = 1;

         this.setState({
            newState
         });

         this.updateListCharacters();
      }
   }

   handleChangeOrder = () => {
      if (!this.state.loading) {
         let newState = this.state;

         if (newState.filters.orderBy === 'name') {
            newState.filters.orderBy = '-name';
         } else {
            newState.filters.orderBy = 'name';
         }

         this.setState({
            newState
         });

         // update list
         this.updateListCharacters();
      }
   }

   updateListCharacters = () => {
      this.setState({
         loading: true,
      });

      (async () => {
         try {
            const response = await axios.get(API_MAP.characters, 
            {
               params: {
                  ...params,
                  ...this.state.filters,
               }
            });

            this.setState({
               loading: false,
               characters: response.data.data.results,
               totalCharacters: response.data.data.total,
            });          
         } catch (error) {
            console.log(error);

            this.setState({
               loading: false,
               error: true,
            });
         }
      })();
   }

   componentWillMount () {
      this.updateListCharacters();
   }

   handleChangePagination = (action) => {
      let newState = this.state;

      // pagination
      let page = this.state.current_page;
      let total = this.state.totalCharacters;
      let limit = this.state.filters.limit;
      let initialOffset = this.state.filters.offset;
      let maxPage = Math.ceil(total / limit);
      let offset = 0;

      if (action === 'next') {
         if ((page + 1) <= maxPage) {
            newState.current_page = page + 1;
            offset = (limit * (page + 1)) - limit;
         } else {
            offset = initialOffset;
         }
      } else {
         if ((page - 1) > 0) {
            newState.current_page = page - 1;
            offset = (limit * (page - 1)) - limit;
         } else {
            offset = initialOffset;
         }
      }

      newState.filters.offset = offset;

      this.setState({
         newState
      });

      this.updateListCharacters();
   }

   render() {
      const { loading, error, filters, characters, current_page, totalCharacters } = this.state;
      const pageLimit = Math.ceil(totalCharacters / filters.limit);

      return (
         <div className="characters">
            <div className="title">
               Characters
            </div>

            <div className="m30"></div>

            <div className="characters__filters">
               <div className="filters__search">
                  <input 
                     type="text"
                     placeholder='Press enter to search'
                     value={this.state.filters.nameStartsWith ? this.state.filters.nameStartsWith : ''}
                     onChange={this.handleChangeSearch}
                     onKeyPress={this.handlePressEnter}
                     disabled={this.state.loading}
                  />
               </div>

               <div className="filters__select">
                  <div className="filters__funil">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M21.646 2.707H2.004a.794.794 0 0 1-.85-.727.785.785 0 0 1 .85-.821h19.645a.793.793 0 0 1 .85.726.785.785 0 0 1-.85.822h-.003zm-7.397 9.002c-.34.413-.524.925-.523 1.452v7.77c0 1.054-.883 1.907-1.974 1.907-1.09 0-1.973-.853-1.973-1.906V13.16a2.273 2.273 0 0 0-.52-1.452l-6.453-7.84h17.89l-6.447 7.84zM21.65 0H2.004C.898 0 0 .865 0 1.933a1.93 1.93 0 0 0 1.159 1.755l-.021.018L8.32 12.44c.167.205.258.459.258.72v7.77c0 1.695 1.422 3.069 3.177 3.069 1.754 0 3.176-1.374 3.176-3.068V13.16c0-.263.092-.518.262-.723l7.155-8.683c1.041-.36 1.583-1.467 1.21-2.473C23.273.505 22.505-.01 21.65 0z"/>
                     </svg>
                  </div>

                  <div className="filters__order">{filters.orderBy === 'name' ? 'A-Z' : 'Z-A'}</div>

                  <div
                     className={`filters__arrow ${filters.orderBy === 'name' && '--asc'} ${this.state.loading && '--disabled'}`}
                     onClick={this.handleChangeOrder}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="9px" viewBox="0 0 16 9">
                        <g stroke="none" strokeWidth="1" fillRule="evenodd" transform="translate(-1282.000000, -38.000000)">
                           <path d="M1286.69482,34.6902697 C1286.41519,34.4276942 1285.97772,34.4381538 1285.71085,34.7137956 C1285.57621,34.8425655 1285.5,35.0211231 1285.5,35.2078395 C1285.5,35.3945559 1285.57621,35.5731135 1285.71085,35.7018834 L1292.76261,42.5008687 L1285.71085,49.2998539 C1285.57621,49.4286238 1285.5,49.6071814 1285.5,49.7938978 C1285.5,49.9806142 1285.57621,50.1591718 1285.71085,50.2879417 C1285.83556,50.4281514 1286.01572,50.5056841 1286.20283,50.4996748 C1286.38409,50.4987277 1286.55887,50.4318661 1286.69482,50.3114676 L1294.28541,43.0184385 C1294.42276,42.8815181 1294.5,42.6952124 1294.5,42.5008687 C1294.5,42.3065249 1294.42276,42.1202192 1294.28541,41.9832989 L1286.69482,34.6902697 Z" id="Shape" fillRule="nonzero" transform="translate(1290.000000, 42.500000) rotate(450.000000) translate(-1290.000000, -42.500000) "></path>
                        </g>
                     </svg>
                  </div>
               </div>
               <div className="clear"></div>
            </div>

            <div className="clear"></div>

            <div className="m30"></div>

            {loading && !error &&
               <div className={`loader`}>
                  <span></span>
               </div>
            }

            {!loading && error &&
               <div className="error">
                  Oops, something went wrong =(
               </div>
            }

            {!loading && !error &&
               <React.Fragment>
                  {characters && characters.length > 0 && 
                     <div className="characters__list">
                        {characters.map((character) => (
                           <div className="characters__item" key={character.id}>
                              <div className="characters__thumbnail" style={{ backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})` }}></div>
                              <div className="m15"></div>
                              <div className="characters__name">{character.name}</div>
                              <div className="m15"></div>
                              <div className="characters__divider"></div>
                              <div className="m15"></div>
                              <div className="characters__description">
                                 {(character && character.description) ? character.description.length > 100 ? `${character.description.substring(0, 100)}...` : character.description : 'Nenhuma descrição disponível.'}
                              </div>                        
                           </div>
                        ))}
                     </div>
                  }

                  {characters && characters.length <= 0 && 
                     <div className="error">
                        Oops, no character found =(
                     </div>
                  }

                  <div className="m30"></div>

                  <div className="characters__pagination">
                     <div 
                        className={`pagination__arrow --rotate-arrow ${current_page === 1 && '--disabled'}`}
                        onClick={() => this.handleChangePagination('prev')}
                        disabled={current_page === 1}
                     >
                        <svg width="9px" height="16px" viewBox="0 0 9 16">
                           <g stroke="none" strokeWidth="1" fillRule="evenodd">
                              <path d="M1.19481569,0.190269697 C0.91518654,-0.0723057865 0.477717734,-0.0618462288 0.210849827,0.213795598 C0.0762054462,0.342565525 0,0.521123113 0,0.707839508 C0,0.894555903 0.0762054462,1.07311349 0.210849827,1.20188342 L7.26260515,8.00086866 L0.210849827,14.7998539 C0.0762054462,14.9286238 0,15.1071814 0,15.2938978 C0,15.4806142 0.0762054462,15.6591718 0.210849827,15.7879417 C0.335561896,15.9281514 0.515716819,16.0056841 0.702832756,15.9996748 C0.884092141,15.9987277 1.05887176,15.9318661 1.19481569,15.8114676 L8.78540946,8.51843847 C8.92275546,8.3815181 9,8.19521241 9,8.00086866 C9,7.80652491 8.92275546,7.62021922 8.78540946,7.48329885 L1.19481569,0.190269697 Z" fillRule="nonzero" transform="translate(4.500000, 8.000000) rotate(360.000000) translate(-4.500000, -8.000000) "></path>
                           </g>
                        </svg>
                     </div>

                     <div className="pagination__pages">
                        {current_page} de {totalCharacters ? (pageLimit > 0 ? pageLimit : 1) : 1}
                     </div>

                     <div
                        className={`pagination__arrow  ${current_page === pageLimit && '--disabled'}`}
                        onClick={() => this.handleChangePagination('next')}
                        disabled={current_page === pageLimit}
                     >
                        <svg width="9px" height="16px" viewBox="0 0 9 16">
                           <g stroke="none" strokeWidth="1" fillRule="evenodd">
                              <path d="M1.19481569,0.190269697 C0.91518654,-0.0723057865 0.477717734,-0.0618462288 0.210849827,0.213795598 C0.0762054462,0.342565525 0,0.521123113 0,0.707839508 C0,0.894555903 0.0762054462,1.07311349 0.210849827,1.20188342 L7.26260515,8.00086866 L0.210849827,14.7998539 C0.0762054462,14.9286238 0,15.1071814 0,15.2938978 C0,15.4806142 0.0762054462,15.6591718 0.210849827,15.7879417 C0.335561896,15.9281514 0.515716819,16.0056841 0.702832756,15.9996748 C0.884092141,15.9987277 1.05887176,15.9318661 1.19481569,15.8114676 L8.78540946,8.51843847 C8.92275546,8.3815181 9,8.19521241 9,8.00086866 C9,7.80652491 8.92275546,7.62021922 8.78540946,7.48329885 L1.19481569,0.190269697 Z" fillRule="nonzero" transform="translate(4.500000, 8.000000) rotate(360.000000) translate(-4.500000, -8.000000) "></path>
                           </g>
                        </svg>
                     </div>
                  </div>
               </React.Fragment>
            }
            <div className="clear"></div>
         </div>
      );
   }
}

export default Characters;
