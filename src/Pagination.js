import React from 'react'

const Pagination = ({PostsPerPage, totalPosts, paginate}) => {
    let PageNums = [];
    for(let i =1;i<=Math.ceil(totalPosts/PostsPerPage);i++) {
        PageNums.push(i);
    }
  return (
    <>
        <nav className='d-flex justify-content-center mt-5'>
            <ul className='pagination gap-3'>
                {PageNums.map((num) => {
                    return(
                    <li key={num} className="page-item">
                        <a onClick={()=>paginate(num)} href="#" className='page-link'>{num}</a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    </>
  )
}

export default Pagination