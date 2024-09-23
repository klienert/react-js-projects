import React from "react";

class FCC_boot extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="container-fluid">
                <h3 className="text-primary text-center">jQuery Playground</h3>
                <div className="row">
                    <div className="col-xs-6">
                        <h4>#left-well</h4>
                        <div className="well" id="left-well">                            
                            <button className="btn btn-default target" id="target1">#target1</button>
                            <button className="btn btn-default target" id="target2">#target2</button>
                            <button className="btn btn-default target" id="target3">#target3</button>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <h4>#right-well</h4>
                        <div className="well" id="right-well">                            
                            <button className="btn btn-default target" id="target4">#target4</button>
                            <button className="btn btn-default target" id="target5">#target5</button>
                            <button className="btn btn-default target" id="target6">#target6</button>                            
                        </div>
                    </div>

                </div>
     
            </div>
        )
    }
}

export default FCC_boot;