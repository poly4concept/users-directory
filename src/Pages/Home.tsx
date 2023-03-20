import {useEffect, useState, useCallback} from 'react'
import { User } from '../types'
import Loading from '../Components/Loading'
import '../Styles/Home.css'

const Home = () => {
    const [users, setUsers] = useState<User[]>([])
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchUsers = useCallback( async () => {
        setLoading(true)
        const response = await fetch(
            `https://give-me-users-forever.vercel.app/api/users/${pageNumber}/next`
        ).then((response) => response.json());
        setLoading(false)
        setUsers(response.users.slice(0,10));
      },
      [pageNumber],
    )

    const handleNextUsers = () => {
        setPageNumber(pageNumber => pageNumber + 10);
    }
    const handlePrevUsers = () => {
        if (pageNumber >= 10) {
            setPageNumber(pageNumber => pageNumber - 10);
        }
    }

    useEffect(() => {
      fetchUsers()
    }, [fetchUsers])

  return (
    <div className="container">
        <h2>Users Directory</h2>
        <table className='table'>
            <thead className='table__header'>
                <tr>
                    <th>
                        <div className='header_item'>ID</div>
                    </th>
                    <th>
                        <div className='header_item'>Name</div>
                    </th>
                    <th>
                        <div className='header_item'>Job Title</div>
                    </th>
                    <th>
                        <div className='header_item'>Company</div>
                    </th>
                    <th>
                        <div className='header_item'>Email Address</div>
                    </th>
                    <th>
                        <div className='header_item'>Phone Number</div>
                    </th>
                </tr>
              </thead>
              {
                loading ?
                <Loading/> : 
                <tbody className='table__body'>
                    {
                        users.map(user => (
                            <tr>
                                <td>{user.ID}</td>
                                <td>{user.FirstNameLastName}</td>
                                <td>{user.JobTitle}</td>
                                <td>{user.Company}</td>
                                <td>{user.EmailAddress}</td>
                                <td>{user.Phone}</td>
                            </tr>
                        ))
                    }
                </tbody>
              }
          </table>
          
          <div className="actions">
            <button
            className={`button button--prev ${pageNumber < 10 ? 'button--disabled' : ''} `}
            onClick={handlePrevUsers}>
                Prev
            </button>
            <button className='button button--next' onClick={handleNextUsers}>Next</button>
          </div>
    </div>
  )
}

export default Home