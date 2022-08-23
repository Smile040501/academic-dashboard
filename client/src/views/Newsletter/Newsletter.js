import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, {useState} from "react";
import {fetchNews} from "services/newsletter";

const useStyles = makeStyles({
    heading:
        {
            background: 'blue',
            color: 'white',
            fontSize: 16,
            alignContent: 'center'
        },
    st1:
    {
        background: '#D09CD9',
        display :"flex",
        padding:9,
    },
    st2 :
    {
        background: 'white',
        display :"flex",
        padding:9,
    },
    news :
    {
        alignContent: 'left',
    },
    st :
    {
        background: 'white',
        display :"block",
    },
  });
function  Newsletter (props)
{
    const classes = useStyles(props);
    const [newsr, setNews] = useState([]);

    React.useEffect(() => {
        async function fetchData() {
            let fetchedEvents = await fetchNews();
            let newArray = [];
            for (let i = 0; i < fetchedEvents.length; i += 2) {
                newArray.push([fetchedEvents[i], i + 1 < fetchedEvents.length ? fetchedEvents[i + 1] : null]);
            }
            setNews(newArray);
        }

        fetchData();
    }, []);

    return(
        <React.Fragment>
            <GridContainer>
                <GridItem xs={12}  sm ={12} md={12} xl={12}></GridItem>
                <GridItem xs={2}  sm ={2} md={2} xl={2}> </GridItem>
                <GridItem xs={8}  sm ={8} md={8} xl={8}>
            <div>
            {newsr?.map((news, index) => {
                    return (
                         
                        <GridContainer key={index} className={classes.st}>
                            <GridItem className={classes.st1} xs={12} sm={12} md={12}  xl={12}>
                            <GridItem xs={2} sm={2}>
                            {news[0].id} 
                            </GridItem>
                            <GridItem xs={10}  sm={10} className={classes.news}>
                            {news[0].title}
                            </GridItem>
                            </GridItem>
                            {news[1] ? (
                                <React.Fragment>
                                    <GridItem className={classes.st2} xs={12} sm={12} md={12}  xl={12}>
                                    <GridItem xs={2}  sm={2} >
                                        {/* Sl no: {index}  */}
                                        {news[1].id} 
                                    </GridItem>
                                    <GridItem xs={10}  sm={10} className={classes.news}>
                                    {news[1].title}
                                    </GridItem>
                                    </GridItem>
                                </React.Fragment>
                            )
                            : <React.Fragment />}
                        </GridContainer>
                        
                    )})
            }  
            </div>
            </GridItem>
            {/* </GridItem> */}
            <GridItem xs={2}  sm ={2} md={2} xl={2}> </GridItem>
            </GridContainer>
        </React.Fragment>
    );
}
export default Newsletter
