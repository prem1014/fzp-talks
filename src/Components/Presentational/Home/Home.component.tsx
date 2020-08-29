import React, { useState, useEffect } from 'react';

import './Home.component.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import AppService from '../../Service/App-service';

import LinkedList from '../../Shared/LinkedList/linkedList';
import HashTable from '../../Shared/Hashtable/HashTable';

const Home = () => {
    const history = useHistory();
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState(0);

    const listOfPratinidhi = [
        {
            name: 'स्वर्गीय नंदू राय',
            post: 'मुखिया',
            fromYr: '1978',
            toYr: '2001'
        },
        {
            name: 'स्वर्गीय नंदू राय',
            post: 'मुखिया',
            fromYr: 'May 2001',
            toYr: 'July 2001'
        },
        {
            name: 'विजय कुमार शर्मा',
            post: 'मुखिया',
            fromYr: '2002',
            toYr: '2006'
        },
        {
            name: 'विजय कुमार शर्मा',
            post: 'मुखिया',
            fromYr: '2006',
            toYr: '2011'
        },
        {
            name: 'विजय कुमार शर्मा',
            post: 'मुखिया',
            fromYr: '2011',
            toYr: '2016'
        },
        {
            name: 'कुंती देवी',
            post: 'मुखिया',
            fromYr: '2016',
            toYr: 'अब तक'
        },
    ]

    const feedbackList = [
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        }
    ]

    const userReg = () => {
        history.push('/reg');
    }

    const feedback = () => {
        history.push('/feedback');
    }

    const getFeedback = () => {
        AppService.getFeedback()
            .then(res => {
                setFeedbacks(res.data.result);
            })
            .catch(err => {

            });
    }

    const getUsers = () => {
        AppService.getUsers()
        .then(res => {
            setUsers(res.data.totalUsers);
        })
        .catch(err => {

        });
    }

    useEffect(() => {
        setFeedbacks(JSON.parse(sessionStorage.getItem('feedback') || '[]'));
        getUsers();
        getFeedback();
    }, []);

    return (
        <div className="home">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center">हमारी सोच</h4>
                        <hr />
                        <h5 className="text-center">
                            'फैज़ुल्लाहपुर Talks' अगले 10 वर्ष में फैज़ुल्लाहपुर को बिहार के 10 अग्रणी गावों की
                            पंक्ति में खड़ा करने की एक पहल है। इसका उद्देश्य ऐसा करने की
                            सोच रखने वालों को जोड़ना और एक सशक्त
                            राजनीतिक नेतृत्व का निर्माण करना है।
                        </h5>
                        <hr />
                        <h2 className="text-center">{users}</h2>
                        <h5 className="text-center">लोग हमसे जुड़ चुके है।</h5>
                        <hr />
                        <h5 className="text-center">
                            <Button variant="contained" color="primary" onClick={() => userReg()}>हमसे जुड़ें</Button>
                        </h5>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center">गांव के विकाश के लिए प्राप्त सुझाव</h4>
                        <hr />
                        <div className="feedback">
                            {
                                feedbacks.map((res: any) => (
                                    <div className="item app-box-shadow">
                                        <h5 style={{ color: '#FF8F00' }}>{res.subject}</h5>
                                        <p>{res.details}</p>
                                        {
                                            res.name && <a style={{ color: '#26C6DA', fontWeight: 'bold' }}>सुझाव देने वाला का नाम: {res.name}</a>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <h5 className="text-center">
                            <Button variant="contained" color="primary" onClick={() => feedback()}>अपना सुझाव दें</Button>
                        </h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center">हमारे पंचायत के स्कूल</h4>
                        <hr />
                        <ol style={{ fontWeight: 'bold' }}>
                            <li style={{ color: '#FF6F00' }}>के एन शर्मा हाई स्कूल फैज़ुल्लाहपुर</li>
                            <li style={{ color: '#00BCD4' }}>उत्क्रमित मध्य विद्यालय नरवार</li>
                            <li style={{ color: '#4CAF50' }}>उत्क्रमित मध्य विद्यालय श्यामनगर</li>
                        </ol>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center">हमारे पंचायत के प्रतिनिधि</h4>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>नाम</th>
                                        <th>पद</th>
                                        <th>कब से</th>
                                        <th>कब तक</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listOfPratinidhi.map(d => (
                                            <tr>
                                                <td>{d.name}</td>
                                                <td>{d.post}</td>
                                                <td>{d.fromYr}</td>
                                                <td>{d.toYr}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center">हमारे पंचायत की समस्याएं</h4>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center">बाढ़</h4>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center">स्वास्थ सेवाओं की कमी</h4>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center">साफ़ पानी की समस्या</h4>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center">शैक्षिक संस्थान</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;