import React, { useState, useEffect, useRef } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { arrayMove } from 'react-sortable-hoc'
import { Button } from 'react-bootstrap'
import cuid from 'cuid'

const SortableItem = SortableElement(({ value }) => (
    <div className="item">
        <div className="inner-item">
            <img className="photo-preview" src={value.url} />
        </div>
    </div>
));

const SortableList = SortableContainer(({ items }) => {
    //console.log(items)
    return (
        <div className="container">
            {items.map((value, index) => (
                <SortableItem key={`item-${cuid()}`} index={index} value={value} />
            ))}
        </div>
    );
});

function PhotoPreview(props) {
    const { photos, update, destination } = props;
    const [photoArray, setPhotoArray] = useState(photos);

    useEffect(() => {
        setPhotoArray(photos);
    }, [photos])

    const onSortEnd = ({ oldIndex, newIndex, collection }) => {
        setPhotoArray(arrayMove(photoArray, oldIndex, newIndex));
    };

    function handleUpdate() {
        update(photoArray, destination);
    }

    return (
        <>
            <SortableList items={photoArray || []} onSortEnd={onSortEnd} axis={"xy"} helperClass="SortableHelper" />
            <Button onClick={handleUpdate}>{`Update ${destination} order`}</Button>
        </>
    )
};

export default PhotoPreview;