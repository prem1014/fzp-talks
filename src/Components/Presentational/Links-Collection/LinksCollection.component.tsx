import React from 'react';

import linksList from './links.json';

const LinksCollection: React.FC<any> = (props: any) => {
    
    return (
        <div className="row">
            {
                linksList.links.map( link => (
                    <div key={link.url} className="col-lg-4 col-md-4 col-6" style={{margin: '10px 0'}}>
                        <a href={link.url} target='_blank'>{link.name}</a>
                    </div>
                ))
            }
        </div>
    )
}

export default LinksCollection;