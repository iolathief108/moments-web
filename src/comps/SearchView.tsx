import SelectSearch, { fuzzySearch } from "react-select-search/dist/cjs";
import { localVendorTypes } from "../utils/other";
import { LocationNode, VendorType } from "../http/generated";
import { useEffect, useState } from "react";
import styled from "styled-components";


interface SearchViewProps {
    onClick: () => void;
    districtKey: string;
    setDistrictKey: (v: string) => void;
    districts: LocationNode[];
    vType?: VendorType;
    setVType: (v: VendorType) => void;
}

const Drop = ({
                  ar,
                  selected,
                  onClick,
                  placeholder
              }: { placeholder?: string, ar: { name, value }[], selected?: string, onClick: (v: string) => void }) => {


    const [active, setActive] = useState<boolean>(false);
    const Container = styled.div`
      position: relative;
      display: inline-block;
      min-width: 190px;
      @media (max-width: 767px) {
        min-width: 100%;
      }

      .dropdown-btn {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 9px 4px 9px 12px;

        background-color: #fff;
        border: 2px solid ${active ? "#0075ae" : "#d9d9d9"};
        border-radius: 4px;
        box-sizing: border-box;
        color: ${active || selected ? "#505049" : "#aaa"};
        font-size: 16px;
        font-weight: 400;
        height: 44px;
        width: 100%;

        .arrow {
          color: #0075ae;
        }
      }

      .list {
        background: #fff;
        border: 2px solid #d9d9d9;
        border-radius: 4px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
        cursor: pointer;
        margin-top: 4px;
        max-height: 250px;
        overflow: auto;
        position: absolute;
        width: 100%;
        z-index: 20;

        li {
          font-size: 14px;
          line-height: 21px;
          text-decoration: none;
          display: block;
          font-weight: 500;
          padding: 8px 14px;

          &:hover {
            background-color: #eee;
            color: #21201f;
          }
        }
      }
    `;

    const toggle = (override?: boolean) => () => {
        if (override !== undefined) {
            setActive(override);
            return;
        }
        setActive(!active);
    };

    useEffect(() => {
        function dd(event) {
            if (!event.target.matches(".dropdown-btn, .dropdown-btn span")) {
                toggle(false)();
            }
        }

        window.addEventListener("click", dd);
        return () => {
            window.removeEventListener("click", dd);
        };
    }, []);

    const getSelectedName = () => {

        // console.log(selected, ar);
        if (selected) {
            for (let i = 0; i < ar.length; i++) {
                if (ar[i].value === selected) {
                    // console.log(ar[i].value, selected);
                    return ar[i].name;
                }
            }
        }
        return undefined;
    };

    return (
        <Container style={{maxWidth: '100%', width: '100%'}}>
            <div className={"d-flex align-items-center dropdown-btn"} onClick={toggle()}>
                <span style={{
                    overflow:"hidden",
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                }} >{getSelectedName() || placeholder}</span>
                <span className={`arrow mr-1 fa fa-chevron-${active ? "up" : "down"} d-flex align-items-center`}></span>
            </div>
            {
                active &&
                <div onClick={toggle()} className={`list`}>
                    <ul>
                        {
                            ar.map(v => <li key={v.value} onClick={() => onClick(v.value)}>{v.name}</li>)
                        }
                    </ul>
                </div>
            }
        </Container>
    );
};

export function SearchView(props: SearchViewProps) {


    return (
        <>
            <div style={{ minHeight: "44px" }} className="pb-2 col-12 col-sm-6 col-md-4 pr-sm-0">

                <Drop
                    ar={localVendorTypes.map(value => ({
                        name: value.displayName.replace("Wedding", ""),
                        value: value.vendorType
                    })) || []}
                    placeholder="Photographers, Hotels & More"
                    selected={props.vType || undefined}
                    onClick={v => props.setVType(v as any)} />

                {/*<SelectSearch*/}
                {/*    options={localVendorTypes.map(value => ({*/}
                {/*        name: value.displayName.replace("Wedding", ""),*/}
                {/*        value: value.vendorType*/}
                {/*    })) || []}*/}
                {/*    value={props.vType || undefined}*/}
                {/*    onChange={(v: any) => props.setVType(v)}*/}
                {/*    filterOptions={fuzzySearch}*/}
                {/*    placeholder="Photographers, Hotels & More..."*/}
                {/*    search={true}*/}
                {/*/>*/}
            </div>
            {/*<div className="pb-2 col-12 col-sm-6 col-md-4">*/}
            {/*    <Drop*/}
            {/*        ar={props.districts?.map(value => ({*/}
            {/*            name: value.name,*/}
            {/*            value: value.key*/}
            {/*        })) || []}*/}
            {/*        placeholder="Colombo, Gampaha & Many location"*/}
            {/*        selected={props.districtKey || undefined}*/}
            {/*        onClick={v => props.setDistrictKey(v as any)} />*/}

                {/*<SelectSearch*/}
                {/*    options={props.districts?.map(value => ({*/}
                {/*        name: value.name,*/}
                {/*        value: value.key*/}
                {/*    })) || []}*/}
                {/*    filterOptions={fuzzySearch}*/}
                {/*    onChange={(v: any) => props.setDistrictKey(v)}*/}
                {/*    value={props.districtKey}*/}
                {/*    placeholder="Colombo, Gampaha & Many location"*/}
                {/*    search={true}*/}
                {/*/>*/}
            {/*</div>*/}
            <div className="pb-2 col-12 col-md-4">
                <button className="p-0 btn btn-default btn-block" style={{ height: "100%", width: "100%", minHeight: "40px" }}
                        onClick={props.onClick}>Search
                </button>
            </div>
        </>
    );
}
